import { authClient } from "~/lib/auth-client"

async function getSession() {
	// For type inference only
	const session = await authClient.getSession()
	return session.data
}

export type Auth = NonNullable<Awaited<ReturnType<typeof getSession>>>
