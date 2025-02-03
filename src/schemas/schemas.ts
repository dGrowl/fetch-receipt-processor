import BadRequestSchema from "./badRequest.js"
import ErrorSchema from "./error.js"
import ItemSchema from "./item.js"
import NotFoundSchema from "./notFound.js"
import ReceiptIDSchema from "./receiptId.js"
import ReceiptSchema from "./receipt.js"

const schemas = [
	BadRequestSchema,
	ErrorSchema,
	ItemSchema,
	NotFoundSchema,
	ReceiptIDSchema,
	ReceiptSchema,
]

export default schemas
