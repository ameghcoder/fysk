"use client"
import { Separator, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarInset, SidebarItem, SidebarProvider, Typography } from '@fysk/ui'
import Link from 'next/link'
import React from 'react'
import atomLinks from '@/db/atoms.json'
import BgGradient from '@/components/effects/bg-gradient'
import { Header } from '@/components/layout/header'
import { headerNavLinks, LinkGroups } from '@/config/nav'
import { useUIStore } from '@/hooks/useUIStore'

const overviewLinks: LinkGroups[] = [
    {
        heading: "overview",
        items: [
            {
                label: "Getting Started",
                href: "/docs/"
            },
            {
                label: "Installation",
                href: "/docs/installation"
            },
            {
                label: "Why Use Fysk",
                href: "/docs/why-use-fysk"
            },
            {
                label: "Explore",
                href: "/docs/explore"
            },
            {
                label: "Fysk Provider",
                href: "/docs/provider/fysk-provider"
            },
            {
                label: "+ Request a Component",
                href: "/docs/request-a-component"
            }
        ]
    }
]


const DocsLayout = ({ children }: { children: React.ReactNode }) => {
    const { isSidebarOpened, setIsSidebarOpened } = useUIStore();
    return (
        <div className='bg-secondary/50'>
            <Header />
            <div className="relative px-1 lg:px-5">
                <SidebarProvider open={isSidebarOpened} onOpenChange={setIsSidebarOpened} styleMode="fixed" className='bg-transparent' collapsible="none">
                    <Sidebar className='md:bg-transparent border-transparent h-[calc(100svh-3.5rem)] top-14 pb-4'>
                        <SidebarContent>
                            {
                                <SidebarGroup className='block md:hidden' key={headerNavLinks.heading}>
                                    <SidebarGroupLabel>{headerNavLinks.heading}</SidebarGroupLabel>
                                    <SidebarGroupContent>
                                        {
                                            headerNavLinks.items.map((item, index) => {
                                                return <SidebarItem key={item.label + index} label={item.label} asChild>
                                                    <Link href={item.href} className='text-foreground! text-base! font-normal capitalize'>
                                                        {item.label}
                                                    </Link>
                                                </SidebarItem>
                                            })
                                        }
                                    </SidebarGroupContent>
                                    <Separator />
                                </SidebarGroup>
                            }
                            {
                                [...overviewLinks, ...atomLinks].map((link, index) => (
                                    <SidebarGroup key={link.heading + index}>
                                        <SidebarGroupLabel>{link.heading}</SidebarGroupLabel>
                                        <SidebarGroupContent>
                                            {
                                                link.items.map((item, index) => (
                                                    <SidebarItem key={index} label={item.label} asChild>
                                                        <Link href={item.href} className='text-foreground! text-base! font-normal capitalize'>
                                                            {item.label}
                                                        </Link>
                                                    </SidebarItem>
                                                ))
                                            }
                                        </SidebarGroupContent>
                                    </SidebarGroup>
                                ))
                            }

                        </SidebarContent>
                    </Sidebar>

                    <SidebarInset className="px-4 py-4 lg:py-8 w-full">
                        {children}
                        <div className='flex items-center justify-center py-8 text-sm'>
                            <Typography>Built with 💖 | Created by{" "}<Link href="https://x.com/yrjdev"><Typography variant="strong">Yashraj</Typography></Link></Typography>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
                <BgGradient opacity={0.5} direction='to top' colors={['#005AA7', '#FFFDE4']} darkThemeColors={['#000000', '#171413']} />
            </div>
        </div>
    )
}

export default DocsLayout