import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useGetQueryParams } from "~/hooks/use-watch-query-params"
import { deleteWorkflow } from "~/services/workflow"
import { QUERY_KEYS } from "~/utils/query-keys"

export function useDeleteWorkflow() {
	const queryClient = useQueryClient()
	const { search, page } = useGetQueryParams()

	const mutation = useMutation({
		mutationFn: deleteWorkflow,
		onSuccess: async (deletedWorkflow) => {
			if (deletedWorkflow) {
				queryClient.invalidateQueries({
					queryKey: QUERY_KEYS.workflows(search, page),
				})
				toast.success(`Workflow "${deletedWorkflow.name}" deleted.`)
			}
		},
		onError: () => {
			toast.error("Failed to delete workflow. Please try again.")
		},
	})

	return mutation
}
