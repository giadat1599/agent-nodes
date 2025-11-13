import apiFetch, { type ApiResponse } from "~/lib/api-fetch"
import type { Workflow } from "~/types/workflow"

export type UpdateWorkflowNodesInput = {
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

const RESOURCE = "/nodes"

export async function updateNodes(input: UpdateWorkflowNodesInput) {
	const response = await apiFetch<ApiResponse<Workflow>>(RESOURCE, {
		method: "PATCH",
		body: input,
	})

	if (!response.success) return null
	return response
}
