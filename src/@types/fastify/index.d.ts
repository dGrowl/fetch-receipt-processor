import type MemoryDatabase from "../../core/database.ts"

declare module "fastify" {
	export interface FastifyInstance {
		db: MemoryDatabase
	}
}
