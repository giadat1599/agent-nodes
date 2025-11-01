import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useGetQueryParams } from "~/hooks/use-watch-query-params"
import apiFetch, { type ApiResponse } from "~/lib/api-fetch"
import type { Workflow } from "~/types/workflow"
import { QUERY_KEYS } from "~/utils/query-keys"

export function useDeleteWorkflow() {
	const queryClient = useQueryClient()
	const { search, page } = useGetQueryParams()

	const mutation = useMutation({
		mutationFn: async (id: string) => {
			const response = await apiFetch<ApiResponse<Workflow>>(`/workflows/${id}`, {
				method: "DELETE",
			})

			if (response.success) {
				return response.data
			}
		},
		onSuccess: async (deletedWorkflow) => {
			if (deletedWorkflow) {
				queryClient.invalidateQueries({
					queryKey: QUERY_KEYS.workflows(search, page),
				})
			}
		},
		onError: () => {
			toast.error("Failed to delete workflow. Please try again.")
		},
	})

	return mutation
}
