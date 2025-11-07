import type { Edge as ReactFlowEdge, Node as ReactFlowNode } from "@xyflow/react"
import type { WorkflowConnection, WorkflowNode } from "~/types/workflow"

export function toReactFlowTypes(
	nodes: WorkflowNode[],
	connections: WorkflowConnection[],
): { nodes: ReactFlowNode[]; edges: ReactFlowEdge[] } {
	return {
		nodes: nodes.map((node) => ({
			id: node.id,
			type: node.type,
			position: node.position as { x: number; y: number },
			data: (node.data as Record<string, unknown>) || {},
		})),
		edges: connections.map((conn) => ({
			id: conn.id,
			source: conn.fromNodeId,
			target: conn.toNodeId,
			sourceHandle: conn.fromOutput,
			targetHandle: conn.toInput,
		})),
	}
}
