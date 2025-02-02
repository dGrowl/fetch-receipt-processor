import { Type } from "@fastify/type-provider-typebox"

import ErrorSchema from "./error.js"

const BadRequestSchema = Type.Object(ErrorSchema.properties, {
	$id: "Response::BadRequest",
	description: "The receipt is invalid.",
})

export default BadRequestSchema
