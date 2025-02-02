import { modify, omit } from "../globals/helpers.js"
import ItemSchema, { type Item } from "../../src/schemas/item.js"

const { shortDescription, price } = ItemSchema.properties

export const exampleItem = (): Item => ({
	shortDescription: shortDescription.example,
	price: price.example,
})

export const modifiedItem = (changes: object) => modify(exampleItem(), changes)

export const filteredItem = (propsToRemove: [string, ...string[]]) =>
	omit(exampleItem(), propsToRemove)
