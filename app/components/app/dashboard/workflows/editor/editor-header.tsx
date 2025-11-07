import { SaveIcon } from "lucide-react"
import { toast } from "sonner"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Button } from "~/components/ui/button"
import { LoadingSwap } from "~/components/ui/loading-swap"
import { SidebarTrigger } from "~/components/ui/sidebar"

import { useUpdateWorkflowNodes } from "~/hooks/mutations/nodes/use-update-workflow-nodes"
import { useEditorStore } from "~/stores/editor"
import type { Workflow } from "~/types/workflow"

interface EditorHeaderProps {
	workflow: Workflow
}

export function EditorHeader({ workflow }: EditorHeaderProps) {
	const editor = useEditorStore((state) => state.editor)
	const isAutoSaving = useEditorStore((state) => state.isAutoSaving)
	const mutation = useUpdateWorkflowNodes()

	const handleSaveWorkflow = () => {
		if (!editor) return
		const nodes = editor.getNodes()
		const edges = editor.getEdges()

		mutation.mutate(
			{
				workflowId: workflow.id,
				nodes,
				edges,
			},
			{
				onSuccess(updatedWorkflow) {
					if (updatedWorkflow && !isAutoSaving) {
						toast.success(`Workflow "${updatedWorkflow.name}" updated successfully.`)
					}
				},
			},
		)
	}

	return (
		<header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 bg-background">
			<div className="flex items-center gap-x-2">
				<SidebarTrigger />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/workflows">Workflows</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{workflow.name}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<Button onClick={handleSaveWorkflow} disabled={mutation.isPending || isAutoSaving}>
				<LoadingSwap isLoading={mutation.isPending || isAutoSaving}>
					<div className="flex items-center gap-x-2">
						<SaveIcon />
						Save
					</div>
				</LoadingSwap>
			</Button>
		</header>
	)
}
