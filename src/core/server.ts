import { join } from "node:path"
import { writeFile } from "node:fs/promises"

import {
	TypeBoxValidatorCompiler,
	type TypeBoxTypeProvider,
} from "@fastify/type-provider-typebox"
import AutoLoad from "@fastify/autoload"
import Fastify from "fastify"
import Swagger from "@fastify/swagger"

import {
	autoloadOptions,
	fastifyOptions,
	swaggerOptions,
	type SwaggerType,
} from "./options.js"
import { metaDir } from "../util/helpers.js"
import MemoryDatabase from "./database.js"
import schemas from "../schemas/schemas.js"

export const createServer = async (swaggerType: SwaggerType = "static") => {
	const server = Fastify(fastifyOptions)
		.setValidatorCompiler(TypeBoxValidatorCompiler)
		.withTypeProvider<TypeBoxTypeProvider>()

	server.decorate("db", new MemoryDatabase())

	await server.register(Swagger, swaggerOptions[swaggerType])
	await server.register(AutoLoad, autoloadOptions)

	schemas.forEach(server.addSchema, server)

	await server.ready()

	return server
}

export const createOpenAPIDefinition = async () => {
	const server = await createServer("dynamic")
	await writeFile(
		join(metaDir, "api.generated.yaml"),
		server.swagger({ yaml: true }),
	)
}
