import { describe, expect } from "vitest"
import type { InjectOptions } from "fastify"

import { receiptA } from "../mocks/receipt.js"
import { serverTest } from "../fixtures/server.js"

const createRequest = (id: string): InjectOptions => ({
	method: "GET",
	url: `/receipts/${id}/points`,
})

describe("POST /receipts/process", () => {
	serverTest("should respond with a 200 on succcess", async ({ server }) => {
		const id = server.db.storeReceipt(receiptA)
		const response = await server.inject(createRequest(id))

		expect(response.statusCode).toBe(200)
	})

	serverTest("should respond with a 400 on invalid id", async ({ server }) => {
		const response = await server.inject(createRequest("white%20space"))

		expect(response.statusCode).toBe(400)
	})

	serverTest(
		"should respond with a 404 on nonexistent id",
		async ({ server }) => {
			const response = await server.inject(createRequest("nonexistent"))

			expect(response.statusCode).toBe(404)
		},
	)

	serverTest("should respond with points", async ({ server }) => {
		const id = server.db.storeReceipt(receiptA)
		const response = await server.inject(createRequest(id))
		const body = response.json()

		expect(body?.points).toBe(28)
	})
})
