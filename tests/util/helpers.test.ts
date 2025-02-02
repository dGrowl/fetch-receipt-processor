import { describe, expect, it } from "vitest"

import { isAlphaNumeric } from "../../src/util/helpers"

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

const invalidStrings = ["", "@", "6.49", "a//comment"]

describe.concurrent("isAlphaNumeric", () => {
	it.each(validStrings)("%s @ %# should affirm valid strings", (s) =>
		expect(isAlphaNumeric(s)).toBe(true),
	)

	it.each(invalidStrings)("%s @ %# should reject invalid strings", (s) =>
		expect(isAlphaNumeric(s)).toBe(false),
	)
})
