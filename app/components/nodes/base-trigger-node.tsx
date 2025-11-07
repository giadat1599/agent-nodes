/** biome-ignore-all lint/correctness/useUniqueElementIds: <reat-flow> */
import { type NodeProps, Position, useReactFlow } from "@xyflow/react"
import type { LucideIcon } from "lucide-react"
import { memo, type ReactNode } from "react"

import { BaseHandle } from "./base-handle"
import { BaseNode, BaseNodeContent } from "./base-node"
import { type NodeStatus, NodeStatusIndicator } from "./node-status-indicator"
import { WorkflowNode } from "./workflow-node"

interface BaseTriggerNodeProps extends NodeProps {
	icon: LucideIcon | string
	name: string
	description?: string
	children?: ReactNode
	status?: NodeStatus
	onSettings?: () => void
	onDoubleClick?: () => void
}

export const BaseTriggerNode = memo(
	({
		icon: Icon,
		name,
		description,
		children,
		onSettings,
		onDoubleClick,
		id,
		status = "initial",
	}: BaseTriggerNodeProps) => {
		const { setEdges, setNodes } = useReactFlow()

		const handleDelete = () => {
			setNodes((nds) => nds.filter((n) => n.id !== id))
			setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id))
		}
		return (
			<NodeStatusIndicator status={status} variant="border" className="rounded-l-2xl">
				<WorkflowNode showToolbar name={name} description={description} onDelete={handleDelete} onSettings={onSettings}>
					<BaseNode status={status} onDoubleClick={onDoubleClick} className="rounded-l-2xl relative group">
						<BaseNodeContent>
							{typeof Icon === "string" ? (
								<img src={Icon} alt={name} className="size-16" />
							) : (
								<Icon className="size-4" />
							)}
							{children}
							<BaseHandle id="source-1" type="source" position={Position.Right} />
						</BaseNodeContent>
					</BaseNode>
				</WorkflowNode>
			</NodeStatusIndicator>
		)
	},
)

BaseTriggerNode.displayName = "BaseTriggerNode"
