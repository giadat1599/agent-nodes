import type { NodeProps } from "@xyflow/react"
import { PlusIcon } from "lucide-react"
import { memo, useState } from "react"
import { NodeSelector } from "../app/dashboard/workflows/editor/node-selector"
import { PlaceholderNode } from "./placeholder-node"
import { WorkflowNode } from "./workflow-node"

export const InitialNode = memo((props: NodeProps) => {
	const [selectorOpen, setSelectorOpen] = useState(false)
	return (
		<NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
			<WorkflowNode>
				<PlaceholderNode {...props} onClick={() => setSelectorOpen(true)}>
					<div className="cursor-pointer flex items-center justify-center">
						<PlusIcon className="size-4" />
					</div>
				</PlaceholderNode>
			</WorkflowNode>
		</NodeSelector>
	)
})
