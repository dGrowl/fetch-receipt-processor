import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { Type, type Static } from "@fastify/type-provider-typebox"
import type { TSchema } from "@sinclair/typebox"

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)
export const apiDir = join(__dirname, "..", "api")
export const metaDir = join(__dirname, "..", "..", "meta")

export const ObjectRef = <T extends TSchema>(schema: T) =>
	Type.Unsafe<Static<T>>(Type.Ref(schema.$id ?? ""))

export const isAlphaNumeric = (s: string) =>
	typeof s === "string" && s.match(/^[a-zA-Z0-9]+$/) !== null

export const moneyStringToCents = (money: string) => {
	const match = money.match(/^(\d+).(\d{2})$/)
	if (match === null) {
		return 0
	}
	const [_, dollars, cents, ..._rest] = match
	return 100 * Number(dollars) + Number(cents)
}
