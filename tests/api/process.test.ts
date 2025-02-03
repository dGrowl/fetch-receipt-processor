import { describe, expect } from "vitest"
import type { InjectOptions } from "fastify"

import { ajv } from "../globals/validation.js"
import { exampleReceipt, filteredReceipt } from "../mocks/receipt.js"
import { modify } from "../globals/helpers.js"
import { serverTest } from "../fixtures/server.js"
import ProcessOKSchema from "../../src/schemas/processOk.js"

const okValidator = ajv.compile(ProcessOKSchema)

const baseRequest: InjectOptions = {
	method: "POST",
	url: "/receipts/process",
}

const createRequest = (body: object) => ({
	...baseRequest,
	body,
})

const exampleRequest = createRequest(exampleReceipt())

describe("POST /receipts/process", () => {
	serverTest("should respond with a 200 on succcess", async ({ server }) => {
		const response = await server.inject(exampleRequest)

		expect(response.statusCode).toBe(200)
	})

	serverTest(
		"should respond with a 400 on improper body",
		async ({ server }) => {
			const receipt = modify(exampleReceipt(), { items: [] })
			const response = await server.inject(createRequest(receipt))

			expect(response.statusCode).toBe(400)
		},
	)

	serverTest(
		"should explain the issue with an improper body",
		async ({ server }) => {
			const receipt = modify(exampleReceipt(), { items: [] })
			const response = await server.inject(createRequest(receipt))
			const body = response.json()

			expect(body.message).toBe("body/items must NOT have fewer than 1 items")
		},
	)

	serverTest("should respond with an id", async ({ server }) => {
		const response = await server.inject(exampleRequest)
		const body = response.json()

		expect(okValidator(body)).toBe(true)
	})

	serverTest("should respond with unique ids", async ({ server }) => {
		const responses = await Promise.all([
			server.inject(exampleRequest),
			server.inject(exampleRequest),
		])
		const [{ id: id1 }, { id: id2 }] = responses.map((r) => r.json())

		expect(id1).not.toBe(id2)
	})

	serverTest("should store receipt data in database", async ({ server }) => {
		const response = await server.inject(exampleRequest)
		const { id } = response.json()

		expect(server.db.get(id)).toMatchObject(exampleReceipt())
	})

	serverTest("should not store an invalid receipt", async ({ server }) => {
		const badReceipt = filteredReceipt(["total"])
		await server.inject(createRequest(badReceipt))

		expect(server.db.size).toBe(0)
	})
})
