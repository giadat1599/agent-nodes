import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { MoreHorizontalIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import type { Workflow } from "~/types/workflow"

dayjs.extend(relativeTime)

interface WorkflowItemProps {
	workflow: Workflow
	onDelete: (workflow: Workflow) => void
}

export function WorkflowItem({ workflow, onDelete }: WorkflowItemProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Link to={`/workflows/${workflow.id}`} className="hover:underline">
						{workflow.name}
					</Link>
				</CardTitle>
				<CardDescription>Updated {dayjs(workflow.updatedAt).fromNow()}</CardDescription>
				<CardAction>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="icon" variant="ghost">
								<MoreHorizontalIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem className="text-destructive" onClick={() => onDelete(workflow)}>
								<Trash2Icon className="text-destructive" />
								<span className="text-destructive">Delete</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardAction>
			</CardHeader>
		</Card>
	)
}
