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

export const receiptA: Receipt = {
	retailer: "Target",
	purchaseDate: "2022-01-01",
	purchaseTime: "13:01",
	items: [
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
	],
	total: "35.35",
}

export const receiptB: Receipt = {
	retailer: "M&M Corner Market",
	purchaseDate: "2022-03-20",
	purchaseTime: "14:33",
	items: [
		{
			shortDescription: "Gatorade",
			price: "2.25",
		},
		{
			shortDescription: "Gatorade",
			price: "2.25",
		},
		{
			shortDescription: "Gatorade",
			price: "2.25",
		},
		{
			shortDescription: "Gatorade",
			price: "2.25",
		},
	],
	total: "9.00",
}

export const modifiedReceipt = (changes: object) =>
	modify(exampleReceipt(), changes)

export const filteredReceipt = (propsToRemove: [string, ...string[]]): object =>
	omit(exampleReceipt(), propsToRemove)
