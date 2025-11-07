import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"
import { toast } from "sonner"

import apiFetch, { type ApiResponse } from "~/lib/api-fetch"
import type { Workflow } from "~/types/workflow"
import { QUERY_KEYS } from "~/utils/query-keys"

type UpdateWorkflowNodesInput = {
	workflowId: string
	nodes: {
		id: string
		position: {
			x: number
			y: number
		}
		type?: string | null | undefined
		data?: Record<string, any> | undefined
	}[]
	edges: {
		source: string
		target: string
		sourceHandle?: string | null | undefined
		targetHandle?: string | null | undefined
	}[]
}

export function useUpdateWorkflowNodes() {
	const queryClient = useQueryClient()
	const { workflowId } = useParams()

	const mutation = useMutation({
		mutationFn: async (input: UpdateWorkflowNodesInput) => {
			const response = await apiFetch<ApiResponse<Workflow>>("/nodes", {
				method: "PATCH",
				body: input,
			})
			if (response.success) {
				return response.data
			}
		},
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
