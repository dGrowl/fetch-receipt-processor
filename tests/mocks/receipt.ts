import { exampleItem } from "./item.js"
import { modify, omit } from "../globals/helpers.js"
import ReceiptSchema, { type Receipt } from "../../src/schemas/receipt.js"

const { retailer, purchaseDate, purchaseTime, total } = ReceiptSchema.properties

export const exampleReceipt = (): Receipt => ({
	retailer: retailer.example,
	purchaseDate: purchaseDate.example,
	purchaseTime: purchaseTime.example,
	items: [exampleItem()],
	total: total.example,
})

export const modifiedReceipt = (changes: object) =>
	modify(exampleReceipt(), changes)

export const filteredReceipt = (propsToRemove: [string, ...string[]]): object =>
	omit(exampleReceipt(), propsToRemove)
