import { CreditCardIcon, LogOutIcon } from "lucide-react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { SidebarMenuButton } from "~/components/ui/sidebar"
import { authClient } from "~/lib/auth-client"
import { avatarFallback } from "~/lib/avatar-fallback"

export function AppSidebarFooterMenu() {
	const navigate = useNavigate()
	const { data } = authClient.useSession()

	const handleLogout = () => {
		toast.promise(authClient.signOut, {
			loading: "Logging out...",
			error: "Failed to log out. Please try again.",
			onDismiss: () => {
				navigate("/auth/login")
			},
		})
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton className="gap-x-4 h-10 px-4 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
					<Avatar className="group-data-[collapsible=icon]:size-7">
						<AvatarImage src={data?.user.image || undefined} alt={data?.user.name} />
						<AvatarFallback>{avatarFallback(data?.user.name)}</AvatarFallback>
					</Avatar>
					<span className="font-semibold group-data-[collapsible=icon]:hidden">{data?.user.name}</span>
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-60">
				<DropdownMenuLabel className="truncate text-muted-foreground">{data?.user.email}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="flex items-center justify-between">
					Billing <CreditCardIcon />
				</DropdownMenuItem>
				<DropdownMenuItem className="flex items-center justify-between" onClick={handleLogout}>
					Logout <LogOutIcon />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
