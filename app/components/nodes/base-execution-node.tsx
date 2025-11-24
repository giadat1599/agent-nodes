/** biome-ignore-all lint/correctness/useUniqueElementIds: <react-flow> */
import { type NodeProps, Position, useReactFlow } from "@xyflow/react"
import type { LucideIcon } from "lucide-react"
import { memo, type ReactNode } from "react"
import { BaseHandle } from "./base-handle"
import { BaseNode, BaseNodeContent } from "./base-node"
import { type NodeStatus, NodeStatusIndicator } from "./node-status-indicator"
import { WorkflowNode } from "./workflow-node"

interface BaseExecutionNodeProps extends NodeProps {
	icon: LucideIcon | string
	name: string
	description?: string
	children?: ReactNode
	status?: NodeStatus
	onSettings?: () => void
	onDoubleClick?: () => void
}

export const BaseExecutionNode = memo(
	({
		icon: Icon,
		name,
		description,
		children,
		onSettings,
		onDoubleClick,
		id,
		status = "initial",
	}: BaseExecutionNodeProps) => {
		const { setEdges, setNodes } = useReactFlow()
		const handleDelete = () => {
			setNodes((nds) => nds.filter((n) => n.id !== id))
			setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id))
		}
		return (
			<NodeStatusIndicator status={status} variant="border">
				<WorkflowNode showToolbar name={name} description={description} onDelete={handleDelete} onSettings={onSettings}>
					<BaseNode status={status} onDoubleClick={onDoubleClick}>
						<BaseNodeContent>
							{typeof Icon === "string" ? (
								<img src={Icon} alt={name} className="size-4" />
							) : (
								<Icon className="size-4" />
							)}
							{children}
							<BaseHandle id="target-1" type="target" position={Position.Left} />
							<BaseHandle id="source-1" type="source" position={Position.Right} />
						</BaseNodeContent>
					</BaseNode>
				</WorkflowNode>
			</NodeStatusIndicator>
		)
	},
)

BaseExecutionNode.displayName = "BaseExecutionNode"
