import { describe, expect, it } from "vitest"

import { ajv } from "../globals/validation.js"
import { exampleItem, modifiedItem } from "../mocks/item.js"
import { invalidPrices } from "../mocks/price.js"
import ItemSchema, { type Item } from "../../src/schemas/item.js"

const { shortDescription, price } = exampleItem()
const properties = Object.keys(ItemSchema.properties)

const validItems: Item[] = [
	exampleItem(),
	modifiedItem({ shortDescription: "   Klarbrunn 12-PK 12 FL OZ  " }),
	modifiedItem({ price: "12345.00" }),
]

const invalidItems = [
	{},
	modifiedItem({ extra: "property" }),
	...properties.map((prop) => modifiedItem({}, [prop])),
	...properties.map((prop) => modifiedItem({ [prop]: "" })),
	{
		shortDescription: `${shortDescription}'); DROP TABLE Receipts;--`,
		price,
	},
	...invalidPrices.map((p) => ({ shortDescription, price: p })),
]

const validate = ajv.compile(ItemSchema)

describe.concurrent("ItemSchema validation", () => {
	it.each(validItems)("should affirm valid items", (item) =>
		expect(validate(item)).toBe(true),
	)

	it.each(invalidItems)("should reject invalid items", (item) =>
		expect(validate(item)).toBe(false),
	)
})
