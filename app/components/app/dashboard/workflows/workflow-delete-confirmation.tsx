import { toast } from "sonner"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "~/components/ui/alert-dialog"
import { LoadingSwap } from "~/components/ui/loading-swap"
import { useDeleteWorkflow } from "~/hooks/mutations/workflows/use-delete-workflow"
import type { Workflow } from "~/types/workflow"

interface WorkflowDeleteConfirmationProps {
	workflow: Workflow
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function WorkflowDeleteConfirmation({ workflow, open, onOpenChange }: WorkflowDeleteConfirmationProps) {
	const mutation = useDeleteWorkflow()

	const handleDeleteWorkflow = async () => {
		mutation.mutate(workflow.id, {
			onSuccess() {
				toast.success("Workflow deleted successfully.")
				onOpenChange(false)
			},
		})
	}
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure you want to delete <span className="underline">{workflow.name}</span>?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your workflow and remove all associated data.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteWorkflow}
						disabled={mutation.isPending}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						<LoadingSwap isLoading={mutation.isPending}>Delete</LoadingSwap>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
