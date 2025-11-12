import { type Node, type NodeProps, useReactFlow } from "@xyflow/react"
import { GlobeIcon } from "lucide-react"
import { memo, useState } from "react"
import { BaseExecutionNode } from "~/components/nodes/base-execution-node"
import { type HttpRequestFormData, HttpRequestNodeDialog } from "./node-dialog"

export type HttpRequestNodeData = {
	variableName?: string
	endpoint?: string
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
	body?: string
	[key: string]: unknown
}

type HttpRequestNodeType = Node<HttpRequestNodeData>

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
	const nodeData = props.data
	const description = nodeData.endpoint ? `${nodeData.method || "GET"}: ${nodeData.endpoint}` : "Not configured"

	const { setNodes } = useReactFlow()
	const [dialogOpen, setDialogOpen] = useState(false)

	const handleSubmit = (values: HttpRequestFormData) => {
		setNodes((nds) =>
			nds.map((node) => {
				if (node.id === props.id) {
					return {
						...node,
						data: {
							...node.data,
							...values,
						},
					}
				}
				return node
			}),
		)
	}

	return (
		<>
			<BaseExecutionNode
				{...props}
				icon={GlobeIcon}
				name="HTTP Request"
				description={description}
				onSettings={() => setDialogOpen(true)}
				onDoubleClick={() => setDialogOpen(true)}
			/>
			<HttpRequestNodeDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				onSubmit={handleSubmit}
				nodeData={nodeData}
			/>
		</>
	)
})

HttpRequestNode.displayName = "HttpRequestNode"
