import { Context, Effect, Layer } from "effect";

export class Config extends Context.Service<
	Config,
	{
		readonly getConfig: Effect.Effect<{
			readonly logLevel: string;
			readonly connection: string;
		}>;
	}
>()("Config") {}

export const ConfigLive = Layer.succeed(
	Config,
	Config.of({
		getConfig: Effect.succeed({
			logLevel: "INFO",
			connection: "mysql://username:password@hostname:port/database_name",
		}),
	}),
);
