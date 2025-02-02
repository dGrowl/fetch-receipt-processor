import ItemSchema, { type Item } from "../../src/schemas/item.js"

const { shortDescription, price } = ItemSchema.properties

export const exampleItem = (): Item => ({
	shortDescription: shortDescription.example,
	price: price.example,
})

export const modifiedItem = (changed: object, omitted: string[] = []) => {
	const item = {
		...exampleItem(),
		...changed,
	}
	for (const prop of omitted) {
		delete item[prop]
	}
	return item
}
