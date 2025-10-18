import { redirect } from "react-router"
import { authClient } from "~/lib/auth-client"
import { RegisterForm } from "~/routes/components/auth/register-form"
import type { Route } from "./+types/signup"

export function meta() {
	return [{ title: "Sign Up" }, { name: "description", content: "Create a new account" }]
}

export async function loader({ request }: Route.LoaderArgs) {
	const session = await authClient.getSession({
		fetchOptions: { headers: new Headers(request.headers) },
	})

	if (session.data?.session) return redirect("/")

	return null
}

export default function Page() {
	return <RegisterForm />
}
