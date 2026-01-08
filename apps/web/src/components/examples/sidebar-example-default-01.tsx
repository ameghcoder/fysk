import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarItem,
    SidebarProvider,
    SidebarTrigger,
} from "@fysk/ui"
import { Home, Settings, User, Search } from "lucide-react"

export default function SidebarDemo() {
    return (
        <SidebarProvider>
            <div className="flex h-[400px] w-full items-start rounded-xl border bg-background overflow-hidden relative">
                <Sidebar styleMode="inset" collapsible="icon">
                    <SidebarHeader>
                        <div className="flex items-center gap-2 px-2">
                            <div className="size-6 rounded bg-primary" />
                            <span className="font-bold">Dashboard</span>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Application</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarItem label="Home" icon={<Home className="size-4" />} active />
                                <SidebarItem label="Search" icon={<Search className="size-4" />} />
                                <SidebarItem label="Profile" icon={<User className="size-4" />} />
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarItem label="Settings" icon={<Settings className="size-4" />} />
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                    <header className="flex h-16 items-center gap-2 border-b px-4">
                        <SidebarTrigger />
                        <h1 className="font-semibold">My Project</h1>
                    </header>
                    <div className="p-4">
                        Main content area.
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
