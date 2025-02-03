import { describe, expect, it } from "vitest"

import {
	calcDatePoints,
	calcItemPoints,
	calcItemsLengthPoints,
	calcPoints,
	calcRetailerPoints,
	calcTimePoints,
	calcTotalPoints,
} from "../../src/util/points.js"
import { exampleItem, itemsA, itemsB } from "../mocks/item.js"
import { receiptA, receiptB } from "../mocks/receipt.js"
import type { Item } from "../../src/schemas/item.js"
import type { Receipt } from "../../src/schemas/receipt.js"

const testName = (inputFormatter: string) =>
	`should return the correct points for ${inputFormatter} @ %#`

const retailerPoints: [string, number][] = [
	[receiptA.retailer, 6],
	[receiptB.retailer, 14],
	["", 0],
	["24Lemons7Limes!", 14],
	[" mango  ", 5],
	["a_p_p_l_e_", 5],
]

describe.concurrent("calcRetailerPoints", () => {
	it.each(retailerPoints)(testName("%s"), (retailer, expected) =>
		expect(calcRetailerPoints(retailer)).toBe(expected),
	)
})

const totalPoints: [string, number][] = [
	[receiptA.total, 0],
	[receiptB.total, 75],
	["", 0],
	["1.23", 0],
	["100.23", 0],
	["2.00", 75],
	["4.25", 25],
	["8.50", 25],
	["16.75", 25],
]

describe.concurrent("calcTotalPoints", () => {
	it.each(totalPoints)(testName("%s"), (total, expected) =>
		expect(calcTotalPoints(total)).toBe(expected),
	)
})

const itemsLengthPoints: [Item[], number][] = [
	[receiptA.items, 10],
	[receiptB.items, 10],
	[[], 0],
	[[exampleItem()], 0],
	[[exampleItem(), exampleItem()], 5],
]

describe.concurrent("calcItemsLengthPoints", () => {
	it.each(itemsLengthPoints)(testName("%j"), (items, expected) =>
		expect(calcItemsLengthPoints(items)).toBe(expected),
	)
})

const itemPoints: [Item, number][] = [
	[itemsA[0], 0],
	[itemsA[1], 3],
	[itemsA[4], 3],
	[itemsB[0], 0],
	[{ shortDescription: "Tri", price: "5" }, 1],
	[{ shortDescription: "", price: "0.01" }, 1],
	[{ shortDescription: "Item", price: "399.99" }, 0],
]

describe.concurrent("calcItemPoints", () => {
	it.each(itemPoints)(testName("%j"), (item, expected) =>
		expect(calcItemPoints(item)).toBe(expected),
	)
})

const datePoints: [string, number][] = [
	[receiptA.purchaseDate, 6],
	[receiptB.purchaseDate, 0],
	["", 0],
	["1970-01-04", 0],
	["1970-01-031970-01-03", 0],
]

describe.concurrent("calcDatePoints", () => {
	it.each(datePoints)(testName("%s"), (date, expected) =>
		expect(calcDatePoints(date)).toBe(expected),
	)
})

const timePoints: [string, number][] = [
	[receiptA.purchaseTime, 0],
	[receiptB.purchaseTime, 10],
	["", 0],
	["00:00", 0],
	["23:59", 0],
	["13:59", 0],
	["16:00", 0],
	["14:00", 10],
	["15:59", 10],
	["14:30:30", 0],
]

describe.concurrent("calcTimePoints", () => {
	it.each(timePoints)(testName("%s"), (time, expected) =>
		expect(calcTimePoints(time)).toBe(expected),
	)
})

const receiptPoints: [Receipt, number][] = [
	[receiptA, 28],
	[receiptB, 109],
]

describe.concurrent("calcPoints", () => {
	it.each(receiptPoints)(testName("%j"), (receipt, expected) =>
		expect(calcPoints(receipt)).toBe(expected),
	)
})
