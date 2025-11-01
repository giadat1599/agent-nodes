import { SaveIcon } from "lucide-react"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Button } from "~/components/ui/button"
import { SidebarTrigger } from "~/components/ui/sidebar"
import type { Workflow } from "~/types/workflow"

interface EditorHeaderProps {
	workflow: Workflow
}

export function EditorHeader({ workflow }: EditorHeaderProps) {
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
			<Button>
				<SaveIcon />
				Save
			</Button>
		</header>
	)
}
