import { Outlet } from "react-router"
import { AppLogo } from "~/components/app/app-logo"

export default function Layout() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-2">
			<div className="mb-4">
				<AppLogo />
			</div>
			<Outlet />
		</div>
	)
}
