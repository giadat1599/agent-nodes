import { FolderOpenIcon, HistoryIcon, KeyIcon } from "lucide-react"
import { Link, useLocation } from "react-router"
import { AppLogo } from "~/components/app-logo"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/components/ui/sidebar"
import { AppSidebarFooterMenu } from "./app-sidebar-footer-menu"

const menu_items = [
	{
		name: "Workflows",
		items: [
			{
				name: "Workflows",
				icon: FolderOpenIcon,
				to: "/workflows",
			},
			{
				name: "Credentials",
				icon: KeyIcon,
				to: "/credentials",
			},
			{
				name: "Executions",
				icon: HistoryIcon,
				to: "/executions",
			},
		],
	},
]

export function AppSidebar() {
	const location = useLocation()
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenuItem>
					<SidebarMenuButton asChild className="h-10 px-4">
						<Link to="/workflows">
							<AppLogo className="size-[30px]" />
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarHeader>
			<SidebarContent>
				{menu_items.map((group) => (
					<SidebarGroup key={group.name}>
						<SidebarGroupContent className="space-y-2">
							{group.items.map((item) => (
								<SidebarMenuItem key={item.name}>
									<SidebarMenuButton
										tooltip={item.name}
										isActive={location.pathname.startsWith(item.to)}
										asChild
										className="gap-x-4 h-10 px-4"
									>
										<Link to={item.to} prefetch="intent">
											{<item.icon className="size-4" />}
											<span>{item.name}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<AppSidebarFooterMenu />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
