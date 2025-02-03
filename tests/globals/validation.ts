import { Ajv } from "ajv"
import addFormats from "ajv-formats"

import { ajvOptions } from "../../src/core/options.js"
import schemas from "../../src/schemas/schemas.js"

// @ts-ignore: addFormats not callable; Bug with ajv-formats definitions?
export const ajv: Ajv = addFormats(new Ajv({ ...ajvOptions, schemas }), [
	"date",
])
