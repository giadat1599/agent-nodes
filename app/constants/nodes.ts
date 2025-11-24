import type { NodeTypes } from "@xyflow/react"
import { AnthropicNode } from "~/components/app/dashboard/workflows/editor/executions/anthropic/node"
import { GeminiNode } from "~/components/app/dashboard/workflows/editor/executions/gemini/node"
import { HttpRequestNode } from "~/components/app/dashboard/workflows/editor/executions/http-request/node"
import { OpenAINode } from "~/components/app/dashboard/workflows/editor/executions/openai/node"
import { GoogleFormTriggerNode } from "~/components/app/dashboard/workflows/editor/triggers/google-form/node"
import { ManualTriggerNode } from "~/components/app/dashboard/workflows/editor/triggers/manual-trigger/node"
import { InitialNode } from "~/components/nodes/initial-node"
import type { NodeType } from "~/types/workflow"

export const Node: Record<Uppercase<NodeType>, NodeType> = {
	INITIAL: "initial",
	MANUAL_TRIGGER: "manual_trigger",
	HTTP_REQUEST: "http_request",
	GOOGLE_FORM_TRIGGER: "google_form_trigger",
	GEMINI: "gemini",
	ANTHROPIC: "anthropic",
	OPENAI: "openai",
}

export const NodeComponents = {
	[Node.INITIAL]: InitialNode,
	[Node.HTTP_REQUEST]: HttpRequestNode,
	[Node.MANUAL_TRIGGER]: ManualTriggerNode,
	[Node.GOOGLE_FORM_TRIGGER]: GoogleFormTriggerNode,
	[Node.GEMINI]: GeminiNode,
	[Node.ANTHROPIC]: AnthropicNode,
	[Node.OPENAI]: OpenAINode,
} as const satisfies NodeTypes
