import type { NodeTypes } from "@xyflow/react"
import { InitialNode } from "~/components/nodes/initial-node"
import type { NodeType } from "~/types/workflow"

export const NodeComponents: Record<NodeType, any> = {
	initial: InitialNode,
} as const satisfies NodeTypes

export type RegisteredNodeType = keyof typeof NodeComponents
