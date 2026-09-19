import { BunRuntime } from "@effect/platform-bun";
import { Effect, Layer } from "effect";
import { Database, DatabaseLive } from "./database";
import { Env, EnvLive } from "./env";

const program = Effect.gen(function* () {
	yield* Effect.log("Hello, World!");
	const { port, databaseUrl } = yield* Env;
	yield* Effect.log(port);
	yield* Effect.log(databaseUrl);
	const sql = yield* Database;
	const users = yield* sql`SELECT * FROM users LIMIT 1`;
	yield* Effect.log(users);
});

const AppConfigLive = DatabaseLive.pipe(Layer.provideMerge(EnvLive));

BunRuntime.runMain(Effect.provide(program, AppConfigLive));
