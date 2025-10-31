import { useState } from "react"
import type { Workflow } from "~/types/workflow"
import { WorkflowDeleteConfirmation } from "./workflow-delete-confirmation"
import { WorkflowItem } from "./workflow-item"

interface WorkflowListProps {
	workflows: Workflow[]
}

export function WorkflowList({ workflows }: WorkflowListProps) {
	const [deleteWorkflow, setDeleteWorkflow] = useState<Workflow | null>(null)

	return (
		<div className="flex-1 space-y-5">
			{workflows.map((workflow) => (
				<WorkflowItem workflow={workflow} key={workflow.id} onDelete={setDeleteWorkflow} />
			))}
			{deleteWorkflow && (
				<WorkflowDeleteConfirmation
					workflow={deleteWorkflow}
					open={!!deleteWorkflow}
					onOpenChange={() => setDeleteWorkflow(null)}
				/>
			)}
		</div>
	)
}
