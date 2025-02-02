import { Type } from "@fastify/type-provider-typebox"

const ErrorSchema = Type.Object(
	{
		code: Type.Optional(Type.String()),
		error: Type.String(),
		message: Type.String(),
		statusCode: Type.Number(),
	},
	{ $id: "Response::GenericError", description: "An unspecified issue." },
)

export default ErrorSchema
