import { FlaskConicalIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { LoadingSwap } from "~/components/ui/loading-swap"
import { useExecuteWorkflow } from "~/hooks/mutations/workflows/use-execute-workflow"

interface ExecuteWorkflowButtonProps {
	workflowId: string
}

export function ExecuteWorkflowButton({ workflowId }: ExecuteWorkflowButtonProps) {
	const mutation = useExecuteWorkflow()

	const handleExecute = () => {
		mutation.mutate(workflowId)
	}
	return (
		<Button size="lg" className="w-full" disabled={mutation.isPending} onClick={handleExecute}>
			<LoadingSwap isLoading={mutation.isPending}>
				<div className="flex items-center gap-x-2">
					<FlaskConicalIcon className="size-4" />
					Execute Workflow
				</div>
			</LoadingSwap>
		</Button>
	)
}
