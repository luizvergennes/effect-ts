import { BunRuntime } from "@effect/platform-bun";
import { Effect } from "effect";
import { Config, ConfigLive } from "./env";

const program = Effect.gen(function* () {
  yield* Effect.log("Hello, World!");
  const config = yield* Config;
  yield* Effect.log(config);
});

BunRuntime.runMain(Effect.provide(program, ConfigLive));
