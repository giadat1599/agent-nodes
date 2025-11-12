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
import type { HttpRequestNodeData } from "./node"

const httpRequestFormSchema = z.object({
	variableName: z
		.string()
		.min(1, "Variable name is required")
		.regex(
			/^[a-zA-Z_][a-zA-Z0-9_]*$/,
			"Variable name must start with a letter or underscore and contain only letters, numbers, and underscores.",
		),
	endpoint: z.url("Please enter a valid URL."),
	method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
	body: z.string().optional(),
})

const methodOptions = httpRequestFormSchema.shape.method.options

export type HttpRequestFormData = z.infer<typeof httpRequestFormSchema>

interface HttpRequestNodeDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSubmit: (values: HttpRequestFormData) => void
	nodeData: HttpRequestNodeData
}

export function HttpRequestNodeDialog({ open, onOpenChange, onSubmit, nodeData }: HttpRequestNodeDialogProps) {
	const form = useForm<HttpRequestFormData>({
		resolver: zodResolver(httpRequestFormSchema),
		defaultValues: {
			variableName: nodeData.variableName || "",
			endpoint: nodeData.endpoint || "",
			method: nodeData.method || "GET",
			body: nodeData.body || "",
		},
	})

	const watchMethod = form.watch("method")
	const showBodyField = methodOptions.includes(watchMethod)

	const handleSubmit = (values: HttpRequestFormData) => {
		onSubmit(values)
		onOpenChange(false)
	}

	useEffect(() => {
		if (open) {
			form.reset({
				variableName: nodeData.variableName || "",
				endpoint: nodeData.endpoint || "",
				method: nodeData.method || "GET",
				body: nodeData.body || "",
			})
		}
	}, [open, nodeData, form])

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>HTTP Request</DialogTitle>
					<DialogDescription>Configure settings for the manual trigger node.</DialogDescription>
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
										<Input {...field} placeholder="myApicall" />
									</FormControl>
									<FormDescription>
										Use this variable to reference the response data in other nodes:{" "}
										{`{{${field.value || "myApiCall"}.httpResponse.data}}`}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="method"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Method</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a method" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{methodOptions.map((method) => (
												<SelectItem key={method} value={method}>
													{method}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>The HTTP method to use for the request.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="endpoint"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Endpoint URL</FormLabel>
									<FormControl>
										<Input {...field} placeholder="https://api.example.com/users/{{httpResponse.data.id}}" />
									</FormControl>
									<FormDescription>
										Static URL or use {"{{variable}}"} for simple values or {"{{json variable}}"} to stringify objects
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						{showBodyField && (
							<FormField
								control={form.control}
								name="body"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Request Body</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												className="min-h-[120px] font-mono text-sm"
												placeholder={`{\n  "userId": "{{httpResponse.data.id}}",\n  "name": "{{httpResponse.data.name}}"\n}`}
											/>
										</FormControl>
										<FormDescription>
											JSON with template variables. Use {"{{variable}}"} for simple values or {"{{json variable}}"} to
											stringify objects
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<DialogFooter className="mt-4">
							<Button type="submit">Save</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
