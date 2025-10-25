import type { Route } from "./+types/execution-id"

export default function Page({ params }: Route.LoaderArgs) {
	return <div>Execution ID Page: {params.executionId}</div>
}
