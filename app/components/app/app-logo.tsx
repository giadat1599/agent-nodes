import { cn } from "~/lib/utils"

interface AppLogoProps {
	className?: string
}

export function AppLogo({ className }: AppLogoProps) {
	return (
		<div className="flex items-center gap-2">
			<img src="/agent-nodes.svg" alt="Agent Nodes" className={cn("size-[40px]", className)} />
			<p className="font-semibold group-data-[collapsible=icon]:hidden">Agent Nodes</p>
		</div>
	)
}
