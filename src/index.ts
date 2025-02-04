import { createServer } from "./core/server.js"

const main = async () => {
	const server = await createServer()

	try {
		await server.listen({
			host: process.env.API_SERVER_HOST ?? "localhost",
			port: Number(process.env.API_SERVER_PORT ?? "3000"),
		})
	} catch (error) {
		server.log.error(error)
		process.exit(1)
	}
}

main()
