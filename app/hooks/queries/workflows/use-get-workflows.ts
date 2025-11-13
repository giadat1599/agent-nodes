import { useQuery } from "@tanstack/react-query"
import { useGetQueryParams } from "~/hooks/use-watch-query-params"
import { getWorkflows } from "~/services/workflow"
import { QUERY_KEYS } from "~/utils/query-keys"

export function useGetWorkflows() {
	const { search, page } = useGetQueryParams()
	const query = useQuery({
		queryKey: QUERY_KEYS.workflows(search, page),
		queryFn: () => getWorkflows({ search_text: search || undefined, page: page || undefined }),
	})

	return query
}
