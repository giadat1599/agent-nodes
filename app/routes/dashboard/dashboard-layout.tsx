import { Outlet } from "react-router"
import { AppHeader } from "~/components/app/dashboard/app-header"
import { AppSidebar } from "~/components/app/dashboard/app-sidebar"
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"
import { authMiddleware } from "~/middlewares/auth"
import type { Route } from "./+types/dashboard-layout"

export const middleware: Route.MiddlewareFunction[] = [authMiddleware]

export default function Layout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="bg-accent/20">
				<AppHeader />
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	)
}
