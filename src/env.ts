import { Config, Context, Layer } from "effect";
import type { Redacted } from "effect/Redacted";

export class Env extends Context.Service<
	Env,
	{ port: number; databaseUrl: Redacted<string> }
>()("Env") {}

export const EnvLive = Layer.effect(
	Env,
	Config.all({
		port: Config.Port("PORT").pipe(Config.withDefault(3000)),
		databaseUrl: Config.Redacted("DATABASE_URL"),
	}),
);
