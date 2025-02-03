import { randomUUID } from "node:crypto"

import type { Receipt } from "../schemas/receipt.js"
import { calcPoints } from "../util/points.js"

interface ProcessedReceipt extends Receipt {
	points: number
}

class MemoryDatabase {
	private data: Map<string, ProcessedReceipt>

	constructor() {
		this.data = new Map()
	}

	get(id: string) {
		return this.data.get(id) ?? null
	}

	get size() {
		return this.data.size
	}

	storeReceipt(receipt: Receipt) {
		let id = randomUUID()
		while (this.data.has(id)) {
			id = randomUUID()
		}
		this.data.set(id, {
			...receipt,
			points: calcPoints(receipt),
		})
		return id
	}

	getPoints(id: string) {
		const receipt = this.data.get(id)
		return receipt?.points ?? null
	}
}

export default MemoryDatabase
