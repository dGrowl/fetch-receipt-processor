import { Type } from "@fastify/type-provider-typebox"

const PointsOKSchema = Type.Object(
	{
		points: Type.Integer({ example: 100, format: "int64" }),
	},
	{ description: "The number of points awarded." },
)

export default PointsOKSchema
