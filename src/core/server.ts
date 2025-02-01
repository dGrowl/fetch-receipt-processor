import {
	TypeBoxValidatorCompiler,
	type TypeBoxTypeProvider,
} from "@fastify/type-provider-typebox"
import AutoLoad from "@fastify/autoload"
import Fastify from "fastify"
import Swagger from "@fastify/swagger"

import { autoloadOptions, fastifyOptions, swaggerOptions } from "./options.js"
import schemas from "../schemas/schemas.js"

export const createServer = async () => {
	const server = Fastify(fastifyOptions)
		.setValidatorCompiler(TypeBoxValidatorCompiler)
		.withTypeProvider<TypeBoxTypeProvider>()

	await server.register(Swagger, swaggerOptions)
	await server.register(AutoLoad, autoloadOptions)

	schemas.forEach(server.addSchema, server)

	await server.ready()

	return server
}
