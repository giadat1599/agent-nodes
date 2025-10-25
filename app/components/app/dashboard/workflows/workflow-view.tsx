import type { Workflow } from "~/types/workflow"
import { CreateWorkflowButton } from "./create-workflow-button"
import { EmptyWorkflows } from "./empty-workflows"

interface WorkflowViewProps {
	workflows: Workflow[]
}

export function WorkflowView({ workflows }: WorkflowViewProps) {
	return (
		<div>
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-xl font-semibold">Workflows</h1>
					<p className="text-sm text-muted-foreground">Create and manage your workflows</p>
				</div>
				<CreateWorkflowButton />
			</div>
			{workflows.length > 0 ? <div className="mt-9">{JSON.stringify(workflows, null, 2)}</div> : <EmptyWorkflows />}
		</div>
	)
}
