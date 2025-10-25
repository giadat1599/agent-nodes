import { useQuery } from "@tanstack/react-query"
import apiFetch, { type ApiResponse } from "~/lib/api-fetch"
import { QUERY_KEYS } from "~/lib/query-keys"
import type { Workflow } from "~/types/workflow"

export function useGetWorkflows() {
	const query = useQuery({
		queryKey: QUERY_KEYS.workflows,
		queryFn: async () => {
			const response = await apiFetch<ApiResponse<Workflow[]>>("/workflows")
			if (response.success) {
				return response.data
			}
			return []
		},
	})

	return query
}
