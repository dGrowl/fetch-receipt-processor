import { Type } from "@fastify/type-provider-typebox"

import { ObjectRef } from "../util/helpers.js"
import ReceiptIDSchema from "./receiptId.js"

const ProcessOKSchema = Type.Object(
	{
		id: ObjectRef(ReceiptIDSchema),
	},
	{ description: "Returns the ID assigned to the receipt." },
)

export default ProcessOKSchema
