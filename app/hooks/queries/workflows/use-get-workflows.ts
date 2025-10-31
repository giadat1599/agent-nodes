import { useQuery } from "@tanstack/react-query"
import { useGetQueryParams } from "~/hooks/use-watch-query-params"
import apiFetch, { type PaginatedResponse } from "~/lib/api-fetch"
import { QUERY_KEYS } from "~/lib/query-keys"
import type { Workflow } from "~/types/workflow"

export function useGetWorkflows() {
	const { search, page } = useGetQueryParams()
	const query = useQuery({
		queryKey: QUERY_KEYS.workflows(search, page),
		queryFn: async () => {
			const query = {
				search_text: search || undefined,
				page: page || undefined,
			}

			if (query.search_text) delete query.page
			const response = await apiFetch<PaginatedResponse<Workflow>>("/workflows", {
				query,
			})
			if (response.success) {
				return {
					data: response.data || [],
					pagination: response.pagination,
				}
			}
		},
	})

	return query
}
