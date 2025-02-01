import { describe, expect, it } from "vitest"

import { ajv } from "../globals/validation.js"
import { invalidPrices } from "../mocks/price.js"
import ItemSchema, { Item } from "../../src/schemas/item.js"

const shortDescription = ItemSchema.properties.shortDescription.example
const price = ItemSchema.properties.price.example

const validItems: Item[] = [
	{ shortDescription, price },
	{
		shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ",
		price,
	},
	{
		shortDescription,
		price: "12345.00",
	},
]

const invalidItems = [
	{},
	{ shortDescription },
	{ price },
	{
		shortDescription,
		price,
		extra: "property",
	},
	{
		shortDescription: "",
		price,
	},
	{
		shortDescription,
		price: "",
	},
	{
		shortDescription: shortDescription + "'); DROP TABLE Receipts;--",
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
