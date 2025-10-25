import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import apiFetch, { type ApiResponse } from "~/lib/api-fetch"
import { QUERY_KEYS } from "~/lib/query-keys"
import type { Workflow } from "~/types/workflow"

export function useCreateWorkflow() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const mutation = useMutation({
		mutationFn: async (name: string) => {
			const response = await apiFetch<ApiResponse<Workflow>>("/workflows", {
				method: "POST",
				body: { name },
			})
			if (response.success) {
				return response.data
			}
		},
		onSuccess: async (newWorkflow) => {
			if (newWorkflow) {
				queryClient.setQueryData<Workflow[]>(QUERY_KEYS.workflows, (oldWorkflows) => {
					if (oldWorkflows) {
						return [...oldWorkflows, newWorkflow]
					}
					return [newWorkflow]
				})
				navigate(`/workflows/${newWorkflow.id}`)
			}
		},
	})

	return mutation
}
