import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { getWorkflow } from "~/services/workflow"
import type { Workflow } from "~/types/workflow"
import { QUERY_KEYS } from "~/utils/query-keys"

export function useGetWorkflow(workflow?: Workflow) {
	const { workflowId } = useParams()
	const query = useQuery({
		initialData: workflow,
		queryKey: QUERY_KEYS.workflows(workflowId),
		queryFn: async () => {
			if (!workflowId) return
			return await getWorkflow(workflowId)
		},
	})

	return query
}
