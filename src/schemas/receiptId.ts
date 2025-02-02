import { Type } from "@fastify/type-provider-typebox"

const ReceiptIDSchema = Type.String({
	$id: "Schema::ReceiptID",
	description: "The ID of the receipt.",
	example: "adb6b560-0eef-42bc-9d16-df48f30e89b2",
	pattern: "^\\S+$",
})

export default ReceiptIDSchema
