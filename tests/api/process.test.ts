import { describe, expect, it } from "vitest"

import { createServer } from "../../src/core/server.js"

describe("POST /receipts/process", () => {
	it("should return a greeting with the provided name", async () => {
		const server = await createServer()
		const name = "Fetch"

		const response = await server.inject({
			method: "POST",
			url: "/receipts/process",
			body: { name },
		})
		const body = response.json()

		expect(body.greeting).toBe(`Hello, ${name}!`)
	})
})
