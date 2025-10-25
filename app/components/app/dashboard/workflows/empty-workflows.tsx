import { FolderOpenIcon } from "lucide-react"

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "~/components/ui/empty"

export function meta() {
	return [{ title: "Workflows" }, { name: "description", content: "Your workflows" }]
}

export function EmptyWorkflows() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<FolderOpenIcon />
				</EmptyMedia>
				<EmptyTitle>No Workflows Yet</EmptyTitle>
				<EmptyDescription>
					You haven't created any workflows yet. Get started by creating your first workflow.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	)
}
