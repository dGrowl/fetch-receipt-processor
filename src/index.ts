import {
	TypeBoxValidatorCompiler,
	type TypeBoxTypeProvider,
} from "@fastify/type-provider-typebox"
import AutoLoad from "@fastify/autoload"
import Fastify from "fastify"
import Swagger from "@fastify/swagger"

import { autoloadOptions, swaggerOptions } from "./plugins.js"

const main = async () => {
	const server = Fastify({ logger: true })
		.setValidatorCompiler(TypeBoxValidatorCompiler)
		.withTypeProvider<TypeBoxTypeProvider>()
	await server.register(Swagger, swaggerOptions)
	await server.register(AutoLoad, autoloadOptions)
	await server.ready()

	try {
		await server.listen({ port: 3000 })
	} catch (error) {
		server.log.error(error)
		process.exit(1)
	}
}

main()
