import type { Route } from "./+types/workflow-id"

export default function Page({ params }: Route.LoaderArgs) {
	return <p>Workflow ID Page: {params.workflowId}</p>
}
