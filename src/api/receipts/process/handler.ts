import type { FastifySchema } from "fastify"

import { ObjectRef } from "../../../util/helpers.js"
import BadRequestSchema from "../../../schemas/badRequest.js"
import ErrorSchema from "../../../schemas/error.js"
import ReceiptSchema from "../../../schemas/receipt.js"
import ProcessOKSchema from "../../../schemas/processOk.js"
import type { AutoloadPluginHandler } from "../../../util/types.js"

const summary = "Submits a receipt for processing."
const swaggerSchema: FastifySchema = {
	summary,
	description: summary,
}
const schema = {
	...swaggerSchema,
	body: ObjectRef(ReceiptSchema),
	response: {
		200: ProcessOKSchema,
		"4xx": ObjectRef(ErrorSchema),
		400: ObjectRef(BadRequestSchema),
	},
}
const options = { schema }

const handler: AutoloadPluginHandler = async (app) => {
	app.post("/", options, async (request) => {
		const id = app.db.storeReceipt(request.body)
		return { id }
	})
}

export default handler
