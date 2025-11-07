import type { NodeProps } from "@xyflow/react"
import { MousePointerIcon } from "lucide-react"
import { memo, useState } from "react"
import { BaseTriggerNode } from "~/components/nodes/base-trigger-node"
import { ManualTriggerNodeDialog } from "./node-dialog"

export const ManualTriggerNode = memo((props: NodeProps) => {
	const [dialogOpen, setDialogOpen] = useState(false)
	return (
		<>
			<BaseTriggerNode
				{...props}
				icon={MousePointerIcon}
				name="When clicking 'Execute workflow'"
				onSettings={() => setDialogOpen(true)}
				onDoubleClick={() => setDialogOpen(true)}
			/>
			<ManualTriggerNodeDialog open={dialogOpen} onOpenChange={setDialogOpen} />
		</>
	)
})
