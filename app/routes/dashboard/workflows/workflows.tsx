import { AppContainer } from "~/components/app/app-container"
import { WorkflowView } from "~/components/app/dashboard/workflows/workflow-view"

export function meta() {
	return [{ title: "Workflows" }, { name: "description", content: "Your workflows" }]
}

export default function Page() {
	return (
		<AppContainer>
			<WorkflowView />
		</AppContainer>
	)
}
