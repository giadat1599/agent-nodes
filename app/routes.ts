import { index, layout, prefix, type RouteConfig, route } from "@react-router/dev/routes"

export default [
	...prefix("auth", [
		layout("routes/auth/layout.tsx", [
			route("login", "routes/auth/login.tsx"),
			route("signup", "routes/auth/signup.tsx"),
		]),
	]),
	layout("routes/dashboard/dashboard-layout.tsx", [
		index("routes/home.tsx"),
		...prefix("workflows", [
			route("/", "routes/dashboard/workflows/workflows.tsx"),
			route("/:workflowId", "routes/dashboard/workflows/workflow-id.tsx"),
		]),
		...prefix("credentials", [
			route("/", "routes/dashboard/credentials/credentials.tsx"),
			route("/:credentialId", "routes/dashboard/credentials/credential-id.tsx"),
		]),
		...prefix("executions", [
			route("/", "routes/dashboard/executions/executions.tsx"),
			route("/:executionId", "routes/dashboard/executions/execution-id.tsx"),
		]),
	]),
] satisfies RouteConfig
