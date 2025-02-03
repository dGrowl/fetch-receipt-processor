import { randomUUID } from "node:crypto"

import { describe, expect } from "vitest"

import { databaseTest } from "./fixtures/database.js"
import { exampleReceipt, receiptA, receiptB } from "./mocks/receipt.js"

describe.concurrent("MemoryDatabase::size", () => {
	databaseTest("should start at 0", ({ db }) => {
		expect(db.size).toBe(0)
	})
})

describe.concurrent("MemoryDatabase::storeReceipt", () => {
	databaseTest("should return a uuidv4", ({ db }) => {
		const id = db.storeReceipt(exampleReceipt())

		expect(id).toMatch(
			/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}/,
		)
	})

	databaseTest(
		"should store receipts according to the returned id",
		({ db }) => {
			const receipt = exampleReceipt()
			const id = db.storeReceipt(receipt)
			const storedReceipt = db.get(id)

			expect(storedReceipt).toMatchObject(receipt)
		},
	)

	databaseTest("should add calculated points to stored receipts", ({ db }) => {
		const id = db.storeReceipt(receiptA)
		const storedReceipt = db.get(id)

		expect(storedReceipt?.points).toBe(28)
	})

	databaseTest("should increase the size of the database", ({ db }) => {
		db.storeReceipt(receiptA)
		expect(db.size).toBe(1)

		db.storeReceipt(receiptB)
		expect(db.size).toBe(2)
	})
})

describe.concurrent("MemoryDatabase::getPoints", () => {
	databaseTest("should return the calculated points", ({ db }) => {
		const id = db.storeReceipt(receiptA)
		const points = db.getPoints(id)

		expect(points).toBe(28)
	})

	databaseTest("should return null on unregistered id", ({ db }) => {
		const points = db.getPoints(randomUUID())

		expect(points).toBeNull()
	})
})
