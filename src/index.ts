import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import AutoLoad from "@fastify/autoload"
import Fastify from "fastify"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = Fastify({ logger: true })
server.register(AutoLoad, {
	dir: join(__dirname, "api"),
})

try {
	await server.listen({ port: 3000 })
} catch (error) {
	server.log.error(error)
	process.exit(1)
}
