import { AppLoading } from "~/components/app/app-loading"
import { Editor } from "~/components/app/dashboard/workflows/editor/editor"
import { EditorHeader } from "~/components/app/dashboard/workflows/editor/editor-header"
import { useGetWorkflow } from "~/hooks/queries/workflows/use-get-workflow"
import apiFetch, { type ApiResponse } from "~/lib/api-fetch"
import type { Workflow } from "~/types/workflow"
import type { Route } from "./+types/workflow-id"

export async function loader({ params, request }: Route.LoaderArgs) {
	try {
		const response = await apiFetch<ApiResponse<Workflow>>(`/workflows/${params.workflowId}`, {
			method: "GET",
			headers: new Headers(request.headers),
		})
		if (response.success) {
			return { workflow: response.data }
		}
	} catch {}
}

export function meta({ data }: Route.MetaArgs) {
	return [{ title: data?.workflow?.name || "Workflow" }]
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const workflow = useGetWorkflow(loaderData?.workflow || undefined)

	if (workflow.isPending) {
		return <AppLoading />
	}

	if (!workflow.data) {
		return <div className="flex-1 flex items-center justify-center flex-col gap-2">Workflow not found.</div>
	}

	return (
		<>
			<EditorHeader workflow={workflow.data} />
			<Editor workflow={workflow.data} />
		</>
	)
}
