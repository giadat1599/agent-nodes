import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { Button } from "~/components/ui/button"
import apiFetch from "~/lib/api-fetch"
import { authClient } from "~/lib/auth-client"
import { requireAuth } from "~/lib/require-auth"
import type { Route } from "./+types/home"
export function meta() {
	return [{ title: "Agent Nodes" }, { name: "description", content: "Welcome to Agent Nodes!" }]
}

export async function loader({ request }: Route.LoaderArgs) {
	return await requireAuth(request)
}

export default function Home() {
	const navigate = useNavigate()

	const { data } = useQuery({
		queryKey: ["workflows"],
		queryFn: async () => {
			const response = await apiFetch("/workflows", { method: "GET" })
			return response
		},
	})
	return (
		<div>
			{JSON.stringify(data)}
			<Button
				onClick={() =>
					authClient.signOut(undefined, {
						onSuccess: () => {
							navigate("/auth/login")
						},
					})
				}
			>
				Logout
			</Button>
		</div>
	)
}
