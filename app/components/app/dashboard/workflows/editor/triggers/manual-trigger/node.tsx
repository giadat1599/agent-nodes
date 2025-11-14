import type { NodeProps } from "@xyflow/react"
import { MousePointerIcon } from "lucide-react"
import type { Realtime } from "node_modules/@inngest/realtime/types.mjs"
import { memo, useState } from "react"
import { BaseTriggerNode } from "~/components/nodes/base-trigger-node"
import { useNodeStatus } from "~/hooks/use-node-status"
import { getManualTriggerRealTimeRefreshToken } from "~/services/inngest"
import { ManualTriggerNodeDialog } from "./node-dialog"

export const ManualTriggerNode = memo((props: NodeProps) => {
	const [dialogOpen, setDialogOpen] = useState(false)
	const nodeStatus = useNodeStatus({
		nodeId: props.id,
		channel: "manual-trigger-execution",
		topic: "status",
		refreshToken: async () => {
			const token = await getManualTriggerRealTimeRefreshToken()
			return token as Realtime.Subscribe.Token
		},
	})
	return (
		<>
			<BaseTriggerNode
				{...props}
				icon={MousePointerIcon}
				status={nodeStatus}
				name="When clicking 'Execute workflow'"
				onSettings={() => setDialogOpen(true)}
				onDoubleClick={() => setDialogOpen(true)}
			/>
			<ManualTriggerNodeDialog open={dialogOpen} onOpenChange={setDialogOpen} />
		</>
	)
})
