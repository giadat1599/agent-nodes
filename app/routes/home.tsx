import { requireAuth } from "~/lib/require-auth"
import type { Route } from "./+types/home"

export function meta() {
	return [{ title: "Agent Nodes" }, { name: "description", content: "Welcome to Agent Nodes!" }]
}

export async function loader({ request }: Route.LoaderArgs) {
	return await requireAuth(request)
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return <div>Start creating a workflow: {loaderData.user.email}</div>
}
