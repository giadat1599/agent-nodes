import { Outlet } from "react-router"

export default function Layout() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-2">
			<div className="flex items-center gap-2">
				<img src="/agent-nodes.svg" alt="Agent Nodes" className="size-[40px]" />
				<p className="font-semibold">Agent Nodes</p>
			</div>
			<Outlet />
		</div>
	)
}
