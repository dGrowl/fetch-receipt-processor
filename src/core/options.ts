import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import type { AutoloadPluginOptions } from "@fastify/autoload"
import type { FastifyServerOptions } from "fastify"
import type { Options as AjvOptions } from "ajv"
import type { SwaggerOptions } from "@fastify/swagger"

import formats from "../formats/formats.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const ajvOptions: AjvOptions = {
	formats,
	keywords: [{ keyword: "example", type: "string" }],
}

export const autoloadOptions: AutoloadPluginOptions = {
	dir: join(__dirname, "../api"),
}

export const swaggerOptions: SwaggerOptions = {
	openapi: {
		openapi: "3.0.3",
		info: {
			title: "Receipt Processor",
			description: "A simple receipt processor",
			version: "1.0.0",
		},
	},
	refResolver: {
		buildLocalReference: (json, _baseUri, _fragment, i) =>
			json.$id?.toString() ?? `def-${i}`,
	},
}

export const fastifyOptions: FastifyServerOptions = {
	logger: process.env.NODE_ENV !== "test",
	ajv: {
		customOptions: ajvOptions,
	},
}
