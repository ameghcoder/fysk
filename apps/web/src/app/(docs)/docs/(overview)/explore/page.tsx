import React from 'react'
import ComponentLinks from '@/db/components.json'
import { Card, CardContent, Typography } from '@fysk/ui'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import { OnThisPageHeadings } from '@/lib/mdx'
import DocsMainContentWrapper from '@/components/section/docs-main-content-wrapper'

export const metadata: Metadata = {
    title: "Explore Components - Fysk",
    description: "Browse all available Fysk components and UI blocks.",
}

const Explore = () => {
    // Generate toc from ComponentLinks sections
    const toc: OnThisPageHeadings[] = ComponentLinks.map((section) => ({
        level: 2,
        text: section.heading.charAt(0).toUpperCase() + section.heading.slice(1),
        id: section.heading.toLowerCase().replace(/\s+/g, '-'),
    }))

    return (
        <DocsMainContentWrapper toc={toc}>
            <div>
                <Typography variant="h1" className="mb-4">Explore Components</Typography>
                <Typography variant="lead">
                    A comprehensive list of all available UI components and interactive blocks in the Fysk library.
                </Typography>
            </div>

            {ComponentLinks.map((section, idx) => (
                <div key={idx} className="space-y-6" id={section.heading.toLowerCase().replace(/\s+/g, '-')}>
                    <Typography variant="h2" className="capitalize border-b border-border pb-2">{section.heading}</Typography>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {section.items.map((item) => (
                            <Link key={item.href} href={item.href} className="group no-underline">
                                <Card className="hover:bg-muted/50 transition-colors border-border/60">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <Typography className="font-medium capitalize m-0">{item.label}</Typography>
                                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </DocsMainContentWrapper>
    )
}

export default Explore

