import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	type Connection,
	Controls,
	type Edge,
	type EdgeChange,
	type Node,
	type NodeChange,
	Panel,
	ReactFlow,
} from "@xyflow/react"
import { useCallback, useState } from "react"
import type { Workflow } from "~/types/workflow"
import "@xyflow/react/dist/style.css"

import { NodeComponents } from "~/utils/nodes"
import { toReactFlowTypes } from "~/utils/to-react-flow"
import { AddNodeButton } from "./add-node-button"

interface EditorProps {
	workflow: Workflow
}

export function Editor({ workflow }: EditorProps) {
	const initialReactFlowData = toReactFlowTypes(workflow.nodes, workflow.connections)
	const [nodes, setNodes] = useState<Node[]>(() => initialReactFlowData.nodes)
	const [edges, setEdges] = useState<Edge[]>(() => initialReactFlowData.connections)

	const onNodesChange = useCallback(
		(changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
		[],
	)
	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
		[],
	)
	const onConnect = useCallback((params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), [])

	return (
		<div className="size-full">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={NodeComponents}
				fitView
			>
				<Background />
				<Controls />
				<Panel position="top-right">
					<AddNodeButton />
				</Panel>
			</ReactFlow>
		</div>
	)
}
