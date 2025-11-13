import { isServer } from "@tanstack/react-query"
import apiFetch, { type ApiResponse, type PaginatedResponse } from "~/lib/api-fetch"
import type { Workflow } from "~/types/workflow"

interface CreateWorkflowInput {
	name: string
}

const RESOURCE = "/workflows"

export async function getWorkflow(workflowId: string, request?: Request) {
	const response = await apiFetch<ApiResponse<Workflow>>(`${RESOURCE}/${workflowId}`, {
		method: "GET",
		headers: isServer ? new Headers(request?.headers) : undefined,
	})
	if (!response.success) return null
	return response.data
}

export async function getWorkflows(query: { search_text?: string; page?: string }) {
	if (query.search_text) delete query.page
	const response = await apiFetch<PaginatedResponse<Workflow>>(RESOURCE, {
		query,
	})

	if (!response.success) return null
	return {
		data: response.data || [],
		pagination: response.pagination,
	}
}

export async function createWorkflow(params: CreateWorkflowInput) {
	const response = await apiFetch<ApiResponse<Workflow>>(RESOURCE, {
		method: "POST",
		body: params,
	})

	if (!response.success) return null
	return response.data
}

export async function deleteWorkflow(workflowId: string) {
	const response = await apiFetch<ApiResponse<Workflow>>(`${RESOURCE}/${workflowId}`, {
		method: "DELETE",
	})

	if (!response.success) return null
	return response.data
}

export async function executeWorkflow(workflowId: string) {
	const response = await apiFetch<ApiResponse<Workflow>>(`${RESOURCE}/${workflowId}/execute`, {
		method: "POST",
	})

	if (!response.success) return null
	return response.data
}
