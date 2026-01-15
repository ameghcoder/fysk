
'use client'
import React from 'react'
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Twitter } from "lucide-react"
import { LogoIconPNG } from './logo'
import { Typography } from '@fysk/ui'
import BgGradient from '../effects/bg-gradient'

const footerLinks = {
    product: [
        { label: "Components", href: "/docs/components" }
    ],
    resources: [
        { label: "Documentation", href: "/docs" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Star on GitHub", href: "https://github.com/ameghcoder/fysk" },
        { label: "Creator_Profile", href: "https://x.com/yrjdev" }
    ]
}

const FooterSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.21, 0.47, 0.32, 0.98] as const
            }
        },
    }

    return (
        <footer className="relative w-full overflow-hidden border-t border-border pb-12">
            <BgGradient position='absolute' direction='to top' colors={[]} darkThemeColors={["#fff", "#000"]} />
            < motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 py-16 "
            >
                <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-12 lg:gap-8">

                    {/* Brand Column */}
                    <motion.div variants={itemVariants} className="flex items-center md:items-start flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2 w-fit">
                            <LogoIconPNG showText={true} className="size-8" />
                        </Link>
                        <Typography variant={'muted'} className='text-center md:text-left'>
                            Crafting the next generation of digital experiences.
                            Beautifully designed, thoughtfully accessible, and incredibly performant.
                        </Typography>
                    </motion.div>

                    {/* Links Columns */}
                    <div className="gap-8 md:gap-12 lg:pl-12 md:justify-self-end">
                        {[
                            { title: "Company", items: footerLinks.company },
                        ].map((column, idx) => (
                            <motion.div variants={itemVariants} key={idx} className="flex flex-col md:flex-row gap-4">
                                <ul className="flex flex-col md:flex-row gap-4">
                                    {column.items.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <Link
                                                href={link.href}
                                                className="transition-colors duration-300"
                                            >
                                                <Typography variant="small" className=''>
                                                    {link.label}
                                                </Typography>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Separator */}
                <motion.div variants={itemVariants} className="w-full h-px bg-border my-12" />

                {/* Bottom Bar */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-muted-foreground/50 font-mono">
                        © {new Date().getFullYear()} Fysk UI. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link href="https://github.com/ameghcoder/fysk" className="text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                            <span className="sr-only">GitHub</span>
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link href="https://x.com/yrjdev" className="text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                            <span className="sr-only">Twitter</span>
                            <Twitter className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    )
}

export default FooterSection


