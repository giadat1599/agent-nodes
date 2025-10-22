export function avatarFallback(name: string | null | undefined) {
	if (!name) return "UN"
	const names = name.split(" ")
	if (names.length === 1) return names[0].slice(0, 2).toUpperCase()
	return (names[0][0] + names[1][0]).toUpperCase()
}
