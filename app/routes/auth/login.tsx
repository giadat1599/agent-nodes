import { redirect } from "react-router"
import { LoginForm } from "~/components/app/auth/login-form"
import { authClient } from "~/lib/auth-client"
import type { Route } from "./+types/login"

export function meta() {
	return [{ title: "Login" }, { name: "description", content: "Login to your account" }]
}

export async function loader({ request }: Route.LoaderArgs) {
	const session = await authClient.getSession({
		fetchOptions: { headers: new Headers(request.headers) },
	})

	if (session.data?.session) return redirect("/")

	return null
}

export default function Page() {
	return <LoginForm />
}
