import { describe, expect, it } from "vitest"

import { isAlphaNumeric, moneyStringToCents } from "../../src/util/helpers.js"

describe.concurrent("isAlphaNumeric", () => {
	const validStrings = [
		"a",
		"m",
		"z",
		"A",
		"T",
		"Z",
		"0",
		"3",
		"9",
		"SphinxOfBlackQuartzJudgeMyVow",
		"aBc12d3",
	]
	it.each(validStrings)("should affirm a valid string: %s @ %#", (s) =>
		expect(isAlphaNumeric(s)).toBe(true),
	)

	const invalidStrings = ["", "@", "6.49", "a//comment"]
	it.each(invalidStrings)("should reject an invalid string: %s @ %#", (s) =>
		expect(isAlphaNumeric(s)).toBe(false),
	)
})

describe.concurrent("moneyStringToCents", () => {
	const moneyCents: [string, number][] = [
		["", 0],
		["0", 0],
		[".00", 0],
		["0.00", 0],
		["0.70", 70],
		["1.00", 100],
		["3.25", 325],
		["321.23", 32123],
	]
	it.each(moneyCents)(
		"should return the correct amount: %s @ %#",
		(money, expected) => expect(moneyStringToCents(money)).toBe(expected),
	)
})
