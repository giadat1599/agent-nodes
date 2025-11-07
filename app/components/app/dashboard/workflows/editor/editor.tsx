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

import { NodeComponents } from "~/constants/nodes"

import { useEditorStore } from "~/stores/editor"
import { toReactFlowTypes } from "~/utils/to-react-flow"
import { AddNodeButton } from "./add-node-button"

interface EditorProps {
	workflow: Workflow
}

export function Editor({ workflow }: EditorProps) {
	const setEditor = useEditorStore((state) => state.setEditor)
	// const setIsAutoSaving = useEditorStore((state) => state.setIsAutoSaving)
	const initialReactFlowData = toReactFlowTypes(workflow.nodes, workflow.connections)

	const [nodes, setNodes] = useState<Node[]>(() => initialReactFlowData.nodes)
	const [edges, setEdges] = useState<Edge[]>(() => initialReactFlowData.edges)

	// const mutation = useUpdateWorkflowNodes()

	const onNodesChange = useCallback(
		(changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
		[],
	)
	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
		[],
	)
	const onConnect = useCallback((params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), [])

	// const handleAutoSave = useCallback(async () => {
	// 	setIsAutoSaving(true)
	// 	await mutation.mutateAsync({
	// 		workflowId: workflow.id,
	// 		nodes,
	// 		edges,
	// 	})
	// 	setIsAutoSaving(false)
	// }, [nodes, edges])

	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		handleAutoSave()
	// 	}, 1000)
	// 	return () => clearTimeout(timeout)
	// }, [handleAutoSave])

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
				onInit={setEditor}
				panOnScroll
				panOnDrag={false}
				selectionOnDrag
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
