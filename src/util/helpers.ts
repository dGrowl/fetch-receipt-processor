import { Type, type Static } from "@fastify/type-provider-typebox"
import type { TSchema } from "@sinclair/typebox"

export const ObjectRef = <T extends TSchema>(schema: T) =>
	Type.Unsafe<Static<T>>(Type.Ref(schema.$id ?? ""))

export const isAlphaNumeric = (s: string) =>
	typeof s === "string" && s.match(/^[a-zA-Z0-9]+$/) !== null
