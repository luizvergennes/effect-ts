import { NodeSdk } from "@effect/opentelemetry";
import { BunRuntime } from "@effect/platform-bun";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { Console, Effect, Layer } from "effect";
import { Database, DatabaseLive } from "./database";
import { Env, EnvLive } from "./env";

const program = Effect.scoped(
	Effect.gen(function* () {
		yield* Effect.log("Hello, World!");
		const { port, databaseUrl } = yield* Env;
		yield* Effect.log(port);
		yield* Effect.log(databaseUrl);
		const sql = yield* Database;
		const users = yield* sql`SELECT 1 AS one`;
		yield* Effect.log(users);
		yield* Effect.addFinalizer(() =>
			Console.log("Application is about to exit!"),
		);
		yield* Effect.sleep("30 seconds");
	}).pipe(Effect.withSpan("program")),
);

const NodeSdkLive = NodeSdk.layer(() => ({
	resource: { serviceName: "effect-test" },
	spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter()),
}));

const AppConfigLive = DatabaseLive.pipe(Layer.provideMerge(EnvLive), Layer.provideMerge(NodeSdkLive));

BunRuntime.runMain(
	Effect.provide(program, AppConfigLive),
);
