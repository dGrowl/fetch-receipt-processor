import { isAlphaNumeric } from "./helpers.js"
import type { Item } from "../schemas/item.js"
import type { Receipt } from "../schemas/receipt.js"

export const calcRetailerPoints = (retailer: string) => {
	let points = 0
	for (const c of retailer) {
		if (isAlphaNumeric(c)) {
			points += 1
		}
	}
	return points
}

export const calcTotalPoints = (total: string) => {
	const match = total.match(/^\d+.(\d{2})$/)
	if (!match) {
		return 0
	}
	const [_, centsString, ..._rest] = match
	const cents = Number(centsString)
	if (cents === 0) {
		return 75
	}
	if (cents % 25 === 0) {
		return 25
	}
	return 0
}

export const calcItemsLengthPoints = (items: Item[]) =>
	5 * Math.floor(items.length / 2)

export const calcItemPoints = (item: Item) => {
	const description = item.shortDescription.trim()
	const price = Number(item.price)
	return description.length % 3 === 0 ? Math.ceil(price * 0.2) : 0
}

export const calcDatePoints = (date: string) => {
	const match = date.match(/^\d{4}-\d{2}-(\d{2})$/)
	if (!match) {
		return 0
	}
	const [_, day, ..._rest] = match
	return Number(day) % 2 === 1 ? 6 : 0
}

export const calcTimePoints = (time: string) => {
	const match = time.match(/^(\d{2}):\d{2}$/)
	if (!match) {
		return 0
	}
	const [_, hourString, ..._rest] = match
	const hour = Number(hourString)
	return hour >= 14 && hour < 16 ? 10 : 0
}

export const calcPoints = (receipt: Receipt) => {
	let points = 0
	points += calcRetailerPoints(receipt.retailer)
	points += calcTotalPoints(receipt.total)
	points += calcItemsLengthPoints(receipt.items)
	for (const item of receipt.items) {
		points += calcItemPoints(item)
	}
	points += calcDatePoints(receipt.purchaseDate)
	points += calcTimePoints(receipt.purchaseTime)
	return points
}
