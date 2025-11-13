import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { useGetQueryParams } from "~/hooks/use-watch-query-params"
import { createWorkflow } from "~/services/workflow"
import { QUERY_KEYS } from "~/utils/query-keys"

export function useCreateWorkflow() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const { search, page } = useGetQueryParams()

	const mutation = useMutation({
		mutationFn: createWorkflow,
		onSuccess: async (newWorkflow) => {
			if (newWorkflow) {
				queryClient.invalidateQueries({
					queryKey: QUERY_KEYS.workflows(search, page),
				})
				navigate(`/workflows/${newWorkflow.id}`)
			}
		},
		onError: () => {
			toast.error("Failed to create workflow. Please try again.")
		},
	})

	return mutation
}
