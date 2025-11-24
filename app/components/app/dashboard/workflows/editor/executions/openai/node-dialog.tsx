import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Textarea } from "~/components/ui/textarea"
import type { OpenAINodeData } from "./node"

export const AVAILABLE_MODELS = ["gpt-4", "gpt-4o", "gpt-4.1", "gpt-5"] as const

const openAIFormSchema = z.object({
	variableName: z
		.string()
		.min(1, "Variable name is required")
		.regex(
			/^[a-zA-Z_][a-zA-Z0-9_]*$/,
			"Variable name must start with a letter or underscore and contain only letters, numbers, and underscores.",
		),
	model: z.enum(AVAILABLE_MODELS),
	systemPrompt: z.string().optional(),
	userPrompt: z.string().min(1, "User prompt is required"),
})

export type OpenAIFormData = z.infer<typeof openAIFormSchema>

interface OpenAINodeDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSubmit: (values: OpenAIFormData) => void
	nodeData: OpenAINodeData
}

export function OpenAINodeDialog({ open, onOpenChange, onSubmit, nodeData }: OpenAINodeDialogProps) {
	const form = useForm<OpenAIFormData>({
		resolver: zodResolver(openAIFormSchema),
		defaultValues: {
			variableName: nodeData.variableName || "",
			model: nodeData.model || AVAILABLE_MODELS[0],
			systemPrompt: nodeData.systemPrompt || "",
			userPrompt: nodeData.userPrompt || "",
		},
	})

	const handleSubmit = (values: OpenAIFormData) => {
		onSubmit(values)
		onOpenChange(false)
	}

	useEffect(() => {
		if (open) {
			form.reset({
				variableName: nodeData.variableName || "",
				model: nodeData.model || AVAILABLE_MODELS[0],
				systemPrompt: nodeData.systemPrompt || "",
				userPrompt: nodeData.userPrompt || "",
			})
		}
	}, [open, nodeData, form])

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="overflow-scroll max-h-[650px]">
				<DialogHeader>
					<DialogTitle>OpenAI Configuration</DialogTitle>
					<DialogDescription>Configure the AI model and prompts for this node.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 mt-4">
						<FormField
							control={form.control}
							name="variableName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Variable Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="openai" />
									</FormControl>
									<FormDescription>
										Use this variable to reference the response data in other nodes:{" "}
										{`{{${field.value || "openai"}.text}}`}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="model"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Model</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a model" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{AVAILABLE_MODELS.map((model) => (
												<SelectItem key={model} value={model}>
													{model}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>The AI model to use for the request.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="systemPrompt"
							render={({ field }) => (
								<FormItem>
									<FormLabel>System Prompt (Optional)</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className="min-h-[80px] font-mono text-sm"
											placeholder="You are a helpful assistant."
										/>
									</FormControl>
									<FormDescription>
										Sets the behavior of the assistant. Use {"{{variable}}"} for simple values or {"{{json variable}}"}{" "}
										to stringify objects
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="userPrompt"
							render={({ field }) => (
								<FormItem>
									<FormLabel>User Prompt</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className="min-h-[120px] font-mono text-sm"
											placeholder="Summarize this text: {{json.httpResponse.data}}"
										/>
									</FormControl>
									<FormDescription>
										The prompt to send to the AI. Use {"{{variable}}"} for simple values or {"{{json variable}}"} to
										stringify objects
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="mt-4">
							<Button type="submit">Save</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
