import { createServer } from "./core/server.js"

const main = async () => {
	const server = await createServer()

	try {
		await server.listen({ port: 3000 })
	} catch (error) {
		server.log.error(error)
		process.exit(1)
	}
}

main()
