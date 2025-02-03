import { test } from "vitest"

import MemoryDatabase from "../../src/core/database.js"

interface DatabaseTest {
	db: MemoryDatabase
}

export const databaseTest = test.extend<DatabaseTest>({
	// biome-ignore lint: vitest requires destructured first arg
	db: async ({}, use) => {
		const db = new MemoryDatabase()
		await use(db)
	},
})
