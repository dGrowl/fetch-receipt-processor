import { describe, expect, it } from "vitest"

import { validateTime24 } from "../src/formats/time24.js"

const validTimes = ["00:00", "23:59", "05:23", "12:00", "19:09"]

const invalidStrings = [
	"24:00",
	"07:60",
	"",
	":",
	"14:4",
	"7:16",
	"1337",
	"hh:mm",
	"17:49:23",
	"-1:45",
	" 5:31",
	"05:23baseball",
]

describe.concurrent("time24 validator", () => {
	it.each(validTimes)("should affirm valid times", (s) =>
		expect(validateTime24(s)).toBe(true),
	)

	it.each(invalidStrings)("should reject invalid strings", (s) =>
		expect(validateTime24(s)).toBe(false),
	)
})
