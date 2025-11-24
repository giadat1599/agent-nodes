export type NodeType =
	| "initial"
	| "manual_trigger"
	| "http_request"
	| "google_form_trigger"
	| "openai"
	| "gemini"
	| "anthropic"

export type Workflow = {
	id: string
	name: string
	nodes: WorkflowNode[]
	connections: WorkflowConnection[]
	createdAt: Date
	updatedAt: Date
	userId: string
}

export type WorkflowNode = {
	id: string
	name: string
	data: unknown
	type: NodeType
	position: unknown
	createdAt: Date
	updatedAt: Date
	workflowId: string
}

export type WorkflowConnection = {
	id: string
	createdAt: Date
	updatedAt: Date
	workflowId: string
	fromNodeId: string
	toNodeId: string
	fromOutput: string | null
	toInput: string | null
}
