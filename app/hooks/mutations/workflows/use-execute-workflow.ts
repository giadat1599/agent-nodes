import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"
import { toast } from "sonner"
import { executeWorkflow } from "~/services/workflow"
import { QUERY_KEYS } from "~/utils/query-keys"

export function useExecuteWorkflow() {
	const queryClient = useQueryClient()
	const { workflowId } = useParams()

	const mutation = useMutation({
		mutationFn: executeWorkflow,
		onSuccess: async (workflow) => {
			if (workflow) {
				queryClient.invalidateQueries({
					queryKey: QUERY_KEYS.workflows(workflowId),
				})
				toast.success(`Workflow "${workflow.name}" executed.`)
			}
		},
		onError: () => {
			toast.error("Failed to execute workflow. Please try again.")
		},
	})

	return mutation
}
