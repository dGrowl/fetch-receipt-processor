import type { FormatDefinition } from "ajv"

export const validateTime24 = (s: string) =>
	s.match(/^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/) !== null

const time24: FormatDefinition<string> = {
	type: "string",
	validate: validateTime24,
}

export default time24
