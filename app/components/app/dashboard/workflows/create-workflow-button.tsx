import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { LoadingSwap } from "~/components/ui/loading-swap"
import { useCreateWorkflow } from "~/hooks/mutations/workflows/use-create-workflow"

const createWorkflowSchema = z.object({
	name: z.string().min(1, "Workflow name is required."),
})

type CreateWorkflowData = z.infer<typeof createWorkflowSchema>

export function CreateWorkflowButton() {
	const formRef = useRef<HTMLFormElement>(null)

	const mutation = useCreateWorkflow()

	const form = useForm<CreateWorkflowData>({
		resolver: zodResolver(createWorkflowSchema),
		defaultValues: {
			name: "",
		},
	})

	const handleSubmit = async (data: CreateWorkflowData) => {
		await mutation.mutateAsync(data)
	}
	return (
		<Dialog onOpenChange={() => form.reset()}>
			<Form {...form}>
				<form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)}>
					<DialogTrigger asChild>
						<Button type="button">
							<PlusIcon /> New Workflow
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Create a new workflow</DialogTitle>
							<DialogDescription>Enter the name of your new workflow.</DialogDescription>
						</DialogHeader>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input disabled={form.formState.isSubmitting} placeholder="Name" type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button
								type="submit"
								disabled={form.formState.isSubmitting}
								onClick={() => {
									if (formRef.current) {
										formRef.current.dispatchEvent(new Event("submit", { bubbles: true }))
									}
								}}
							>
								<LoadingSwap isLoading={form.formState.isSubmitting}>Create</LoadingSwap>
							</Button>
						</DialogFooter>
					</DialogContent>
				</form>
			</Form>
		</Dialog>
	)
}
