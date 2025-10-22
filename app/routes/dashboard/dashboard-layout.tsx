import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { toast } from "sonner"
import { AppLogo } from "~/components/app-logo"
import { AppHeader } from "~/components/routes/dashboard/app-header"
import { AppSidebar } from "~/components/routes/dashboard/app-sidebar"
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"
import { Spinner } from "~/components/ui/spinner"
import { authClient } from "~/lib/auth-client"

export default function Layout() {
	const navigate = useNavigate()
	const { data, isPending } = authClient.useSession()

	useEffect(() => {
		if (!isPending && !data) {
			navigate("/auth/login")
			toast.error("You must be logged in to access this page.")
			return
		}
	}, [isPending, data, navigate])

	if (isPending) {
		return (
			<div className="min-h-screen flex items-center justify-center gap-4">
				<AppLogo />
				<Spinner className="size-5 text-muted-foreground" />
			</div>
		)
	}

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
