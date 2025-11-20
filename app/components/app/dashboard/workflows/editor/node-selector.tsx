import { useReactFlow } from "@xyflow/react"
import { GlobeIcon, MousePointer2Icon } from "lucide-react"
import { useCallback } from "react"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"
import { Separator } from "~/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet"
import type { NodeType } from "~/types/workflow"

type NodeTypeOption = {
	type: NodeType
	label: string
	description: string
	icon: React.ComponentType<{ className?: string }> | string
}

const triggerNodes: NodeTypeOption[] = [
	{
		type: "manual_trigger",
		label: "Trigger manually",
		description: "Start the workflow manually whenever you need.",
		icon: MousePointer2Icon,
	},
	{
		type: "google_form_trigger",
		label: "Google Form Trigger",
		description: "Start the workflow when a Google Form is submitted.",
		icon: "/googleform.svg",
	},
]

const executionNodes: NodeTypeOption[] = [
	{
		type: "http_request",
		label: "HTTP Request",
		description: "Make an HTTP request.",
		icon: GlobeIcon,
	},
]

interface NodeSelectorProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	children: React.ReactNode
}

export function NodeSelector({ open, onOpenChange, children }: NodeSelectorProps) {
	const { setNodes, getNodes, screenToFlowPosition } = useReactFlow()

	const handleNodeSelect = useCallback(
		(selection: NodeTypeOption) => {
			if (selection.type === "manual_trigger") {
				const nodes = getNodes()
				const hasManualTrigger = nodes.some((node) => node.type === "manual_trigger")
				if (hasManualTrigger) {
					toast.error("A manual trigger node already exists in this workflow.")
					return
				}
			}
			setNodes((nodes) => {
				const hasIntialTrigger = nodes.some((node) => node.type === "initial")
				const centerX = window.innerWidth / 2
				const centerY = window.innerHeight / 2

				const position = screenToFlowPosition({
					x: centerX + (Math.random() - 0.5) * 200,
					y: centerY + (Math.random() - 0.5) * 200,
				})

				const newNode = {
					id: uuidv4(),
					data: {},
					position,
					type: selection.type,
				}

				if (hasIntialTrigger) {
					return [newNode]
				}

				return [...nodes, newNode]
			})

			onOpenChange(false)
		},
		[setNodes, getNodes, screenToFlowPosition, onOpenChange],
	)
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
				<SheetHeader>
					<SheetTitle>What triggers this workflow?</SheetTitle>
					<SheetDescription>A trigger is a step that starts your workflow</SheetDescription>
				</SheetHeader>
				<div>
					{triggerNodes.map((node) => {
						const Icon = node.icon
						return (
							<div
								key={node.type}
								className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
								onClick={() => handleNodeSelect(node)}
							>
								<div className="flex items-center gap-6 w-full overflow-hidden">
									{typeof Icon === "string" ? (
										<img src={Icon} alt={node.label} className="size-5 object-contain rounded-sm" />
									) : (
										<Icon className="size-5" />
									)}
									<div className="flex flex-col items-start text-left">
										<span className="font-medium text-sm">{node.label}</span>
										<span className="text-xs text-muted-foreground">{node.description}</span>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				<Separator />
				<div>
					{executionNodes.map((node) => {
						const Icon = node.icon
						return (
							<div
								key={node.type}
								className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
								onClick={() => handleNodeSelect(node)}
							>
								<div className="flex items-center gap-6 w-full overflow-hidden">
									{typeof Icon === "string" ? (
										<img src={Icon} alt={node.label} className="size-5 object-contain rounded-sm" />
									) : (
										<Icon className="size-5" />
									)}
									<div className="flex flex-col items-start text-left">
										<span className="font-medium text-sm">{node.label}</span>
										<span className="text-xs text-muted-foreground">{node.description}</span>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</SheetContent>
		</Sheet>
	)
}
