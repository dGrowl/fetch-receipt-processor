import { Type, type Static } from "@fastify/type-provider-typebox"

import { moneyStringToCents, ObjectRef } from "../util/helpers.js"
import ItemSchema, { type Item } from "./item.js"

const ReceiptSchema = Type.Object(
	{
		retailer: Type.String({
			description: "The name of the retailer or store the receipt is from.",
			pattern: "^[\\w\\s\\-&]+$",
			example: "M&M Corner Market",
		}),
		purchaseDate: Type.String({
			description: "The date of the purchase printed on the receipt.",
			format: "date",
			example: "2022-01-01",
		}),
		purchaseTime: Type.String({
			description:
				"The time of the purchase printed on the receipt. 24-hour time expected.",
			format: "time24",
			example: "13:01",
		}),
		items: Type.Array(ObjectRef(ItemSchema), { minItems: 1 }),
		total: Type.String({
			description: "The total amount paid on the receipt.",
			pattern: "^\\d+\\.\\d{2}$",
			example: "6.49",
		}),
	},
	{
		$id: "Schema::Receipt",
		additionalProperties: false,
	},
)

export type Receipt = Static<typeof ReceiptSchema>

export const validateReceiptTotal = (total: string, items: Item[]) => {
	const totalCents = moneyStringToCents(total)
	let itemsCents = 0
	for (const { price } of items) {
		itemsCents += moneyStringToCents(price)
	}
	return totalCents === itemsCents
}

export default ReceiptSchema
