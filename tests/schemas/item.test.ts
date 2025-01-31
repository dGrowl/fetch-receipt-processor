import { describe, expect, it } from "vitest"
import { TypeCompiler } from "@sinclair/typebox/compiler"

import ItemSchema from "../../src/schemas/item.js"

const shortDescription = ItemSchema.properties.shortDescription.example
const price = ItemSchema.properties.price.example

const validItems = [
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

const validator = TypeCompiler.Compile(ItemSchema)

describe.concurrent("ItemSchema validator", () => {
	it.each(validItems)("should affirm valid items", (item) =>
		expect(validator.Check(item)).toBe(true),
	)

	it.each(invalidObjects)("should reject invalid objects", (object) =>
		expect(validator.Check(object)).toBe(false),
	)
})
