import Fastify from "fastify"

const server = Fastify({ logger: true })

server.get("/", async (_request, reply) => {
	reply.send({ greeting: "Hello, Fetch!" })
})

try {
	await server.listen({ port: 3000 })
} catch (error) {
	server.log.error(error)
	process.exit(1)
}
