import { Type } from "@fastify/type-provider-typebox"

import ErrorSchema from "./error.js"

const NotFoundSchema = Type.Object(ErrorSchema.properties, {
	$id: "Response::NotFound",
	description: "No receipt found for that ID.",
})

export default NotFoundSchema
