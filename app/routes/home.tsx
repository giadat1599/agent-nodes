import { Button } from "~/components/ui/button"
import { authClient } from "~/lib/auth-client"
import { requireAuth } from "~/lib/require-auth"
import type { Route } from "./+types/home"

export function meta() {
	return [{ title: "Agent Nodes" }, { name: "description", content: "Welcome to Agent Nodes!" }]
}

export async function loader({ request }: Route.LoaderArgs) {
	return await requireAuth(request)
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { session, user } = loaderData
	return (
		<div>
			{JSON.stringify(session)}
			{JSON.stringify(user)}
			<Button onClick={() => authClient.signOut()}>Logout</Button>
		</div>
	)
}
