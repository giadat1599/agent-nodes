import type { NodeTypes } from "@xyflow/react"
import { HttpRequestNode } from "~/components/app/dashboard/workflows/editor/executions/http-request/node"
import { ManualTriggerNode } from "~/components/app/dashboard/workflows/editor/triggers/manual-trigger/node"
import { InitialNode } from "~/components/nodes/initial-node"
import type { NodeType } from "~/types/workflow"

export const Node: Record<Uppercase<NodeType>, NodeType> = {
	INITIAL: "initial",
	MANUAL_TRIGGER: "manual_trigger",
	HTTP_REQUEST: "http_request",
}

export const NodeComponents = {
	[Node.INITIAL]: InitialNode,
	[Node.HTTP_REQUEST]: HttpRequestNode,
	[Node.MANUAL_TRIGGER]: ManualTriggerNode,
} as const satisfies NodeTypes
