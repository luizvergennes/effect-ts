import { PgClient } from "@effect/sql-pg";
import { Context, Effect, Layer } from "effect";
import { Env } from "../env";

export class Database extends Context.Service<Database, PgClient.PgClient>()(
	"Database",
) {}

export const DatabaseLive = Layer.unwrap(
	Effect.gen(function* () {
		const { databaseUrl } = yield* Env;
		return Layer.effect(Database, PgClient.PgClient).pipe(
			Layer.provide(PgClient.layer({ url: databaseUrl })),
		);
	}),
);
