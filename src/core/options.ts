import { join } from "node:path"

import type { AutoloadPluginOptions } from "@fastify/autoload"
import type { FastifyServerOptions } from "fastify"
import type { Options as AjvOptions } from "ajv"
import type {
	FastifyDynamicSwaggerOptions,
	FastifyStaticSwaggerOptions,
} from "@fastify/swagger"

import { apiDir, metaDir } from "../util/helpers.js"
import formats from "../formats/formats.js"

export const ajvOptions: AjvOptions = {
	formats,
	keywords: [
		{
			keyword: "example",
			type: ["string", "number", "integer", "boolean", "object", "array"],
		},
	],
}

export const autoloadOptions: AutoloadPluginOptions = {
	dir: apiDir,
	routeParams: true,
}

const swaggerOptionsStatic: FastifyStaticSwaggerOptions = {
	mode: "static",
	specification: {
		path: join(metaDir, "api.yaml"),
		baseDir: metaDir,
	},
}

const swaggerOptionsDynamic: FastifyDynamicSwaggerOptions = {
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

export const swaggerOptions = {
	static: swaggerOptionsStatic,
	dynamic: swaggerOptionsDynamic,
}

export type SwaggerType = "static" | "dynamic"

export const fastifyOptions: FastifyServerOptions = {
	logger: process.env.NODE_ENV !== "test",
	ajv: {
		customOptions: ajvOptions,
	},
}
