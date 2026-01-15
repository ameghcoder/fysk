"use client"
import { Separator, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarInset, SidebarItem, SidebarProvider, Typography } from '@fysk/ui'
import Link from 'next/link'
import React from 'react'
import componentLinks from '@/db/components.json'
import BgGradient from '@/components/effects/bg-gradient'
import { Header } from '@/components/layout/header'
import { headerNavLinks, LinkGroups } from '@/config/nav'
import { useUIStore } from '@/hooks/useUIStore'

const overviewLinks: LinkGroups[] = [
    {
        heading: "Getting Started",
        items: [
            {
                label: "Introduction",
                href: "/docs/"
            },
            {
                label: "Quick Start",
                href: "/docs/quick-start"
            },
            {
                label: "Why Fysk?",
                href: "/docs/why-use-fysk"
            },
            {
                label: "Installation",
                href: "/docs/installation"
            },
            {
                label: "Explore Components",
                href: "/docs/explore"
            }
        ]
    },
    {
        heading: "Guides",
        items: [
            {
                label: "Fysk Provider",
                href: "/docs/fysk-provider"
            },
            {
                label: "Fysk Hook",
                href: "/docs/fysk-hook"
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
        <div className='relative overflow-hidden'>
            <BgGradient direction='to left' opacity={1} colors={['#000000', '#000000']} darkThemeColors={['#ffffff', '#ff9a9e']} />
            <Header />

            <div className="relative px-1 lg:px-5">
                <SidebarProvider open={isSidebarOpened} onOpenChange={setIsSidebarOpened} styleMode="fixed" className='bg-transparent' collapsible="none">
                    <Sidebar className='md:bg-transparent border-transparent h-[calc(100vh-3.5rem)] top-14 pb-4'>
                        <SidebarContent>
                            {
                                <SidebarGroup className='block md:hidden' key={headerNavLinks.heading}>
                                    <SidebarGroupLabel>{headerNavLinks.heading}</SidebarGroupLabel>
                                    <SidebarGroupContent>
                                        {
                                            headerNavLinks.items.map((item: { label: string; href: string }, index: number) => {
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
                                [...overviewLinks, ...componentLinks].map((link: LinkGroups, index: number) => (
                                    <SidebarGroup key={link.heading + index}>
                                        <SidebarGroupLabel>{link.heading}</SidebarGroupLabel>
                                        <SidebarGroupContent>
                                            {
                                                link.items.map((item: { label: string; href: string }, index: number) => (
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

