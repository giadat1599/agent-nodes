import { AppContainer } from "~/components/app/app-container"
import { AppLoading } from "~/components/app/app-loading"
import { WorkflowView } from "~/components/app/dashboard/workflows/workflow-view"

import { useGetWorkflows } from "~/hooks/queries/workflows/use-get-workflows"

export function meta() {
	return [{ title: "Workflows" }, { name: "description", content: "Your workflows" }]
}

export default function Page() {
	const workflows = useGetWorkflows()

	if (workflows.isPending) {
		return <AppLoading message="Loading your workflows..." />
	}

	return (
		<AppContainer>
			<WorkflowView workflows={workflows.data || []} />
		</AppContainer>
	)
}
