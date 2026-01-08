import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarItem,
    SidebarProvider,
} from "@fysk/ui"
import { Home, Library, Music, Settings } from "lucide-react"

export default function SidebarFloating() {
    return (
        <SidebarProvider styleMode="floating">
            <div className="flex h-[400px] w-full rounded-xl border bg-muted/20 overflow-hidden relative">
                <Sidebar styleMode="floating" collapsible="icon" className="shadow-2xl">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarItem label="Listen Now" icon={<Music className="size-4" />} />
                            <SidebarItem label="Library" icon={<Library className="size-4" />} />
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <div className="flex-1 p-8">
                    <Music className="size-12 opacity-20" />
                    <p className="mt-4 font-bold text-2xl">Music Library</p>
                </div>
            </div>
        </SidebarProvider>
    )
}
