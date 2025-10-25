import { type LoaderFunctionArgs, redirect } from "react-router"
import { sessionContext } from "~/context"
import { authClient } from "~/lib/auth-client"

export async function authMiddleware({ request, context }: LoaderFunctionArgs) {
	const session = await authClient.getSession({
		fetchOptions: { headers: new Headers(request.headers) },
	})

	if (session.data === null) {
		throw redirect("/auth/login")
	}

	context.set(sessionContext, session.data)
}
