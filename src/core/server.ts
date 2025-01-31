import {
	TypeBoxValidatorCompiler,
	type TypeBoxTypeProvider,
} from "@fastify/type-provider-typebox"
import AutoLoad from "@fastify/autoload"
import Fastify, { type FastifyServerOptions } from "fastify"
import Swagger from "@fastify/swagger"

import { autoloadOptions, swaggerOptions } from "./plugins.js"
import formats from "../formats/formats.js"

const fastifyOptions: FastifyServerOptions = {
	logger: true,
	ajv: {
		customOptions: {
			formats,
		},
	},
}

export const createServer = async () => {
	const server = Fastify(fastifyOptions)
		.setValidatorCompiler(TypeBoxValidatorCompiler)
		.withTypeProvider<TypeBoxTypeProvider>()
	await server.register(Swagger, swaggerOptions)
	await server.register(AutoLoad, autoloadOptions)
	await server.ready()

	return server
}
