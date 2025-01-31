import {
	TypeBoxValidatorCompiler,
	type TypeBoxTypeProvider,
} from "@fastify/type-provider-typebox"
import AutoLoad from "@fastify/autoload"
import Fastify, { type FastifyServerOptions } from "fastify"
import Swagger from "@fastify/swagger"

import { autoloadOptions, swaggerOptions } from "./plugins.js"
import formats from "../formats/formats.js"
import schemas from "../schemas/schemas.js"

const fastifyOptions: FastifyServerOptions = {
	logger: true,
	ajv: {
		customOptions: {
			formats,
			keywords: [{ keyword: "example", type: "string" }],
		},
	},
}

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
