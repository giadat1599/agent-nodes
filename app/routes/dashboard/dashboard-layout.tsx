import { Outlet, useMatch } from "react-router"
import { AppHeader } from "~/components/app/app-header"
import { AppSidebar } from "~/components/app/app-sidebar"
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"
import { authMiddleware } from "~/middlewares/auth"
import type { Route } from "./+types/dashboard-layout"

export const middleware: Route.MiddlewareFunction[] = [authMiddleware]

export default function Layout() {
	const match = useMatch("/workflows/:workflowId")
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="bg-accent/20">
				{!match && <AppHeader />}
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	)
}
