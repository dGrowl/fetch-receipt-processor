import { errorCodes, type FastifySchema } from "fastify"
import { Type } from "@fastify/type-provider-typebox"

import { ObjectRef } from "../../../../util/helpers.js"
import ErrorSchema from "../../../../schemas/error.js"
import NotFoundSchema from "../../../../schemas/notFound.js"
import PointsOKSchema from "../../../../schemas/pointsOk.js"
import ReceiptIDSchema from "../../../../schemas/receiptId.js"
import type { AutoloadPluginHandler } from "../../../../util/types.js"

const summary = "Returns the points awarded for the receipt."
const swaggerSchema: FastifySchema = {
	summary,
	description: summary,
}
const schema = {
	...swaggerSchema,
	params: Type.Object({
		id: ObjectRef(ReceiptIDSchema),
	}),
	response: {
		200: PointsOKSchema,
		"4xx": ObjectRef(ErrorSchema),
		404: ObjectRef(NotFoundSchema),
	},
}
const options = { schema }

const handler: AutoloadPluginHandler = async (app) => {
	app.get("/", options, async (request) => {
		const { id } = request.params
		const points = app.db.getPoints(id)
		if (points === null) {
			throw errorCodes.FST_ERR_NOT_FOUND()
		}
		return { points }
	})
}

export default handler
