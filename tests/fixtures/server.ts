/// <reference types="../../src/@types/fastify/index.d.ts" />

import type { FastifyInstance } from "fastify"
import { test } from "vitest"

import { createServer } from "../../src/core/server.js"

interface ServerTest {
	server: FastifyInstance
}

export const serverTest = test.extend<ServerTest>({
	// biome-ignore lint: vitest requires destructured first arg
	server: async ({}, use) => {
		const server = await createServer()
		await use(server)
	},
})
