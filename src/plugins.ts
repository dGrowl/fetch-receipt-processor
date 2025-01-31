import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const autoloadOptions = {
	dir: join(__dirname, "api"),
}

export const swaggerOptions = {
	openapi: {
		openapi: "3.0.3",
		info: {
			title: "Receipt Processor",
			description: "A simple receipt processor",
			version: "1.0.0",
		},
	},
}
