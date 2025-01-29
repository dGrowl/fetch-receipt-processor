import type { AutoloadPluginOptions } from "@fastify/autoload"
import type { FastifyPluginCallback } from "fastify"

type AutoloadPluginHandler = FastifyPluginCallback<
	NonNullable<AutoloadPluginOptions>
>

const handler: AutoloadPluginHandler = async (app, _options) => {
	app.get("/", async (_request, _reply) => {
		return { greeting: "Hello, Fetch!" }
	})
}

export default handler
