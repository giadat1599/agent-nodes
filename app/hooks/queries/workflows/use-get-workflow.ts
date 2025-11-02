import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import apiFetch, { type ApiResponse } from "~/lib/api-fetch"
import type { Workflow } from "~/types/workflow"
import { QUERY_KEYS } from "~/utils/query-keys"

export function useGetWorkflow(workflow?: Workflow) {
	const { workflowId } = useParams()
	const query = useQuery({
		initialData: workflow,
		queryKey: QUERY_KEYS.workflows(workflowId),
		queryFn: async () => {
			const response = await apiFetch<ApiResponse<Workflow>>(`/workflows/${workflowId}`, {
				method: "GET",
			})
			if (response.success && response.data) {
				return response.data
			}
		},
	})

	return query
}
