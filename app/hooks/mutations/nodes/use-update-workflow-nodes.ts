import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"
import { toast } from "sonner"

import { updateNodes } from "~/services/nodes"

import { QUERY_KEYS } from "~/utils/query-keys"

export function useUpdateWorkflowNodes() {
	const queryClient = useQueryClient()
	const { workflowId } = useParams()

	const mutation = useMutation({
		mutationFn: updateNodes,
		onSuccess: async (updatedWorkflow) => {
			if (updatedWorkflow) {
				queryClient.invalidateQueries({
					queryKey: QUERY_KEYS.workflows(workflowId),
				})
			}
		},
		onError: () => {
			toast.error("Failed to update workflow. Please try again.")
		},
	})

	return mutation
}
