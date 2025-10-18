import { redirect } from "react-router"
import { authClient } from "./auth-client"

export async function requireAuth(request: Request) {
	const session = await authClient.getSession({
		fetchOptions: { headers: new Headers(request.headers) },
	})

	if (session.data === null) return redirect("/auth/login")

	return session.data
}
