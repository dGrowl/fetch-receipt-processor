import type { AutoloadPluginOptions } from "@fastify/autoload"
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox"

export type AutoloadPluginHandler = FastifyPluginAsyncTypebox<
	NonNullable<AutoloadPluginOptions>
>
