import { modify, omit } from "../globals/helpers.js"
import ItemSchema, { type Item } from "../../src/schemas/item.js"

const { shortDescription, price } = ItemSchema.properties

export const exampleItem = (): Item => ({
	shortDescription: shortDescription.example,
	price: price.example,
})

export const itemsA: [Item, Item, Item, Item, Item] = [
	{
		shortDescription: "Mountain Dew 12PK",
		price: "6.49",
	},
	{
		shortDescription: "Emils Cheese Pizza",
		price: "12.25",
	},
	{
		shortDescription: "Knorr Creamy Chicken",
		price: "1.26",
	},
	{
		shortDescription: "Doritos Nacho Cheese",
		price: "3.35",
	},
	{
		shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ",
		price: "12.00",
	},
]

const gatorade = () => ({
	shortDescription: "Gatorade",
	price: "2.25",
})

export const itemsB: [Item, Item, Item, Item] = [
	gatorade(),
	gatorade(),
	gatorade(),
	gatorade(),
] as const

export const modifiedItem = (changes: object) => modify(exampleItem(), changes)

export const filteredItem = (propsToRemove: [string, ...string[]]) =>
	omit(exampleItem(), propsToRemove)
