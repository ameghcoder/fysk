'use client'
import React, { useEffect } from 'react'
import { LogoIconPNG } from './logo'
import Link from 'next/link'
import { Button, Separator } from '@fysk/ui'
import { Menu, Star } from 'lucide-react'
import GithubIcon from '../icons/github'
import ThemeToggle from './theme-toggle'
import { useTheme } from 'next-themes'
import { motion } from "framer-motion"

import { headerNavLinks } from "@/config/nav"
import { useUIStore } from '@/hooks/useUIStore'


const Header = () => {
    const { isSidebarOpened, setIsSidebarOpened } = useUIStore();
    return (
        <>
            <header className="h-14 overflow-hidden px-4 lg:px-8 py-2 fixed z-50 w-full top-0 left-0 backdrop-blur-2xl">
                <div className='flex justify-between items-center gap-4'>
                    <nav className='flex items-center gap-4'>
                        <Button onClick={() => setIsSidebarOpened(!isSidebarOpened)} aria-label='Menu' className='md:hidden' variant={'ghost'} size={'icon'}>
                            <Menu />
                        </Button>
                        <Link href={"/"} aria-label='Home'>
                            <div className='w-fit'>
                                <LogoIconPNG showText={true} className='size-8' textClassName='text-xl lowercase' containerClassName="rounded-xl!" />
                            </div>
                        </Link>
                        <Separator orientation='vertical' className='h-6 hidden md:block' />
                        <div className='hidden md:flex items-center gap-4'>
                            {
                                headerNavLinks.items.map((link) => (
                                    <Link key={link.href} className='text-base font-semibold text-muted-foreground hover:text-foreground transition-colors' href={link.href}>{link.label}</Link>
                                ))
                            }
                        </div>
                    </nav>
                    <div className='flex items-center gap-2 md:gap-4'>
                        {/* <div className='block md:hidden'>
                            <Button aria-label='Search' className='cursor-pointer' variant={"outline"} size={'icon'}><SearchIcon /></Button>
                        </div> */}
                        {/* <div className='hidden md:flex'>
                            <Input variant={'double'} aria-label='Search' type='search' icon={<SearchIcon />} placeholder='Search' />
                        </div> */}
                        <ThemeToggle variant='ghost' />
                        <Button aria-label='GitHub Link & Stars Counter' variant={"ghost"} size={"icon"} className='overflow-hidden relative group'>
                            <Link href={"https://github.com/ameghcoder/fysk"} className='w-fit flex items-center gap-2'>
                                <span className='sr-only'>Star on GitHub</span>
                                <GithubIcon className='fill-background invert-100 size-6!' />
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>
            <div className='h-14'></div>
        </>
    )
}

const AestheticHeader = () => {
    'use client'
    const { setTheme } = useTheme();
    useEffect(() => {
        setTheme("dark");
    }, [setTheme]);
    return (
        <>
            <motion.header variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
                },
            }} initial="hidden" animate="visible" className="h-fit overflow-hidden py-3 md:py-6 px-4 lg:px-8 fixed z-50 w-full top-0 left-0 flex items-center justify-between backdrop-blur-sm md:backdrop-blur-none">
                <div className='w-full flex justify-between items-center gap-4 h-full'>
                    <nav className='flex items-center gap-4'>
                        <Link href={"/"} aria-label='Home'>
                            <div className='w-fit'>
                                <LogoIconPNG containerClassName='rounded-full!' showText={true} className='size-8 ' textClassName='text-xl lowercase' />
                            </div>
                        </Link>
                        <Separator orientation='vertical' className='h-6 hidden md:block' />
                        <div className='flex md:hidden items-center gap-4'>
                            <Link key={headerNavLinks.items[0].href} className='text-sm font-semibold capitalize text-muted-foreground hover:text-foreground transition-colors' href={headerNavLinks.items[0].href}>{headerNavLinks.items[0].label}</Link>
                        </div>
                        <div className='hidden md:flex items-center gap-4'>
                            {
                                headerNavLinks.items.map((link) => (
                                    <Link key={link.href} className='text-sm font-semibold capitalize text-muted-foreground hover:text-foreground transition-colors' href={link.href}>{link.label}</Link>
                                ))
                            }
                        </div>
                    </nav>
                    <div className='flex items-center gap-4'>
                        <Button aria-label='GitHub Link & Stars Counter' variant={"link"} size={'sm'} className='overflow-hidden relative group rounded-full'>
                            <Link href={"https://github.com/"} className='w-fit flex items-center gap-2'>
                                <Star className='fill-yellow-200 stroke-yellow-200' />
                                <span>Star on GitHub</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </motion.header>
        </>
    )
}

export { Header, AestheticHeader }