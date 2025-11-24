import type { Realtime } from "@inngest/realtime"
import { type Node, type NodeProps, useReactFlow } from "@xyflow/react"
import { memo, useState } from "react"
import { BaseExecutionNode } from "~/components/nodes/base-execution-node"
import { useNodeStatus } from "~/hooks/use-node-status"
import { getAnthropicRealTimeRefreshToken } from "~/services/inngest"
import { type AnthropicFormData, AnthropicNodeDialog, type AVAILABLE_MODELS } from "./node-dialog"

export type AnthropicNodeData = {
	variableName?: string
	model?: (typeof AVAILABLE_MODELS)[number]
	systemPrompt?: string
	userPrompt?: string
	[key: string]: unknown
}

type AnthropicNodeType = Node<AnthropicNodeData>

export const AnthropicNode = memo((props: NodeProps<AnthropicNodeType>) => {
	const nodeData = props.data
	const description = nodeData.model ? `${nodeData.model}` : "Not configured"

	const { setNodes } = useReactFlow()
	const [dialogOpen, setDialogOpen] = useState(false)

	const nodeStatus = useNodeStatus({
		nodeId: props.id,
		channel: "anthropic-execution",
		topic: "status",
		refreshToken: async () => {
			const token = await getAnthropicRealTimeRefreshToken()
			return token as Realtime.Subscribe.Token
		},
	})

	const handleSubmit = (values: AnthropicFormData) => {
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
				icon="/anthropic.svg"
				name="Anthropic"
				description={description}
				status={nodeStatus}
				onSettings={() => setDialogOpen(true)}
				onDoubleClick={() => setDialogOpen(true)}
			/>
			<AnthropicNodeDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} nodeData={nodeData} />
		</>
	)
})

AnthropicNode.displayName = "AnthropicNode"
