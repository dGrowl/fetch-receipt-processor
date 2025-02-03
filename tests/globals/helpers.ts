export const modify = <T extends object>(base: T, changes: object): T => ({
	...base,
	...changes,
})

export const omit = (
	base: Record<string, unknown>,
	omissions: string[],
): object => {
	for (const prop of omissions) {
		delete base[prop]
	}
	return base
}
