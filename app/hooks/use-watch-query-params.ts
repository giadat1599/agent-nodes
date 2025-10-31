import { useMemo } from "react"
import { useSearchParams } from "react-router"

type QueryParams = "search" | "page" | "page_size"

export function useGetQueryParams() {
	const [queryParam] = useSearchParams()

	return useMemo(() => {
		const entries: Record<QueryParams, string> = {} as Record<QueryParams, string>
		queryParam.forEach((value, key) => {
			entries[key as QueryParams] = value
		})
		return entries
	}, [queryParam])
}
