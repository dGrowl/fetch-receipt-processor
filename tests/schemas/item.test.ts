import { describe, expect, it } from "vitest"

import { ajv } from "../globals/validation.js"
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

const invalidObjects = [
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
	{
		shortDescription,
		price: price + "hockey",
	},
	{
		shortDescription,
		price: ".99",
	},
	{
		shortDescription,
		price: "20",
	},
	{
		shortDescription,
		price: "12345.",
	},
	{
		shortDescription,
		price: "2.999",
	},
	{
		shortDescription,
		price: "1,234.56",
	},
	{
		shortDescription,
		price: "-" + price,
	},
	{
		shortDescription,
		price: "Infinity",
	},
]

const validate = ajv.compile(ItemSchema)

describe.concurrent("ItemSchema validation", () => {
	it.each(validItems)("should affirm valid items", (item) =>
		expect(validate(item)).toBe(true),
	)

	it.each(invalidObjects)("should reject invalid objects", (object) =>
		expect(validate(object)).toBe(false),
	)
})
