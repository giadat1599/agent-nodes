import type { NodeProps } from "@xyflow/react"
import type { Realtime } from "node_modules/@inngest/realtime/types.mjs"
import { memo, useState } from "react"
import { BaseTriggerNode } from "~/components/nodes/base-trigger-node"
import { useNodeStatus } from "~/hooks/use-node-status"
import { getGoogleFormTriggerRealTimeRefreshToken } from "~/services/inngest"
import { GoogleFormTriggerDialog } from "./node-dialog"

export const GoogleFormTriggerNode = memo((props: NodeProps) => {
	const [dialogOpen, setDialogOpen] = useState(false)

	const nodeStatus = useNodeStatus({
		nodeId: props.id,
		channel: "google-form-trigger-execution",
		topic: "status",
		refreshToken: async () => {
			const token = await getGoogleFormTriggerRealTimeRefreshToken()
			return token as Realtime.Subscribe.Token
		},
	})

	return (
		<>
			<BaseTriggerNode
				{...props}
				icon="/googleform.svg"
				name="Google Form"
				status={nodeStatus}
				description="When a form is submitted"
				onSettings={() => setDialogOpen(true)}
				onDoubleClick={() => setDialogOpen(true)}
			/>
			<GoogleFormTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
		</>
	)
})
