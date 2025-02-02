import { Ajv } from "ajv"
import addFormats from "ajv-formats"

import { ajvOptions } from "../../src/core/options"
import schemas from "../../src/schemas/schemas"

export const ajv = addFormats(new Ajv({ ...ajvOptions, schemas }), ["date"])
