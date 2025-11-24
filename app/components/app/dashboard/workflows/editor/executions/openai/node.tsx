import type { Realtime } from "@inngest/realtime"
import { type Node, type NodeProps, useReactFlow } from "@xyflow/react"
import { memo, useState } from "react"
import { BaseExecutionNode } from "~/components/nodes/base-execution-node"
import { useNodeStatus } from "~/hooks/use-node-status"
import { getOpenAIRealTimeRefreshToken } from "~/services/inngest"
import { type AVAILABLE_MODELS, type OpenAIFormData, OpenAINodeDialog } from "./node-dialog"

export type OpenAINodeData = {
	variableName?: string
	model?: (typeof AVAILABLE_MODELS)[number]
	systemPrompt?: string
	userPrompt?: string
	[key: string]: unknown
}

type OpenAINodeType = Node<OpenAINodeData>

export const OpenAINode = memo((props: NodeProps<OpenAINodeType>) => {
	const nodeData = props.data
	const description = nodeData.model ? `${nodeData.model}` : "Not configured"

	const { setNodes } = useReactFlow()
	const [dialogOpen, setDialogOpen] = useState(false)

	const nodeStatus = useNodeStatus({
		nodeId: props.id,
		channel: "openai-execution",
		topic: "status",
		refreshToken: async () => {
			const token = await getOpenAIRealTimeRefreshToken()
			return token as Realtime.Subscribe.Token
		},
	})

	const handleSubmit = (values: OpenAIFormData) => {
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
				icon="/openai.svg"
				name="OpenAI"
				description={description}
				status={nodeStatus}
				onSettings={() => setDialogOpen(true)}
				onDoubleClick={() => setDialogOpen(true)}
			/>
			<OpenAINodeDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} nodeData={nodeData} />
		</>
	)
})

OpenAINode.displayName = "OpenAINode"
