import { Type } from "@fastify/type-provider-typebox"

const ItemSchema = Type.Object(
	{
		shortDescription: Type.String({
			description: "The Short Product Description for the item.",
			pattern: "^[\\w\\s\\-]+$",
			example: "Mountain Dew 12PK",
		}),
		price: Type.String({
			description: "The total price payed for this item.",
			pattern: "^\\d+\\.\\d{2}$",
			example: "6.49",
		}),
	},
	{
		$id: "Schema::Item",
		additionalProperties: false,
	},
)

export default ItemSchema
