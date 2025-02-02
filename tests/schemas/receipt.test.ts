import { describe, expect, it } from "vitest"

import { ajv } from "../globals/validation.js"
import { exampleItem } from "../mocks/item.js"
import {
	exampleReceipt,
	filteredReceipt,
	modifiedReceipt,
} from "../mocks/receipt.js"
import { invalidPrices } from "../mocks/price.js"
import ReceiptSchema, { type Receipt } from "../../src/schemas/receipt.js"

const { retailer, purchaseDate, purchaseTime } = exampleReceipt()
const properties = Object.keys(ReceiptSchema.properties)

const validReceipts: Receipt[] = [
	exampleReceipt(),
	modifiedReceipt({ retailer: `${retailer}-CLOSED MONDAYS ` }),
	modifiedReceipt({ purchaseTime: "17:17" }),
	modifiedReceipt({ purchaseDate: "2024-02-29" }),
	modifiedReceipt({
		items: [exampleItem(), { shortDescription: "Cookies", price: "3.13" }],
	}),
]

const invalidReceipts = [
	{},
	modifiedReceipt({ extra: "property" }),
	...properties.map((prop) => filteredReceipt([prop])),
	...properties.map((prop) => modifiedReceipt({ [prop]: "" })),

	modifiedReceipt({
		retailer: `${retailer}'); DROP TABLE Users;--`,
	}),

	modifiedReceipt({ purchaseDate: `${purchaseDate} ${purchaseTime}` }),
	modifiedReceipt({ purchaseDate: "2022-01-00" }),
	modifiedReceipt({ purchaseDate: "2022-00-16" }),
	modifiedReceipt({ purchaseDate: "2023-02-29" }),
	modifiedReceipt({ purchaseDate: "2024-02-30" }),

	modifiedReceipt({ purchaseTime: "12:34:56" }),
	modifiedReceipt({ purchaseTime: "44:33" }),
	modifiedReceipt({
		purchaseTime: "23:59:00 GMT-0800 (Pacific Standard Time)",
	}),

	modifiedReceipt({ items: [] }),
	modifiedReceipt({ items: [exampleItem().shortDescription] }),

	...invalidPrices.map((total) => modifiedReceipt({ total })),
]

const validator = ajv.compile(ReceiptSchema)

describe.concurrent("ReceiptSchema validation", () => {
	it.each(validReceipts)("should affirm valid receipts", (receipt) =>
		expect(validator(receipt)).toBe(true),
	)

	it.each(invalidReceipts)("should reject invalid receipts", (object) =>
		expect(validator(object)).toBe(false),
	)
})
