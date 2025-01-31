import {
	Type,
	type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox"
import type { AutoloadPluginOptions } from "@fastify/autoload"

type AutoloadPluginHandler = FastifyPluginAsyncTypebox<
	NonNullable<AutoloadPluginOptions>
>

const schema = {
	body: Type.Object({
		name: Type.String({ maxLength: 32, minLength: 1 }),
	}),
}
const options = { schema }

const handler: AutoloadPluginHandler = async (app, _options) => {
	app.post("/", options, async (request, _reply) => {
		const { name } = request.body
		return { greeting: `Hello, ${name}!` }
	})
}

export default handler
