import { Typography } from '@fysk/ui'
import CodeBlock from '@/components/layout/code-block'
import SectionContainerWrapper from '@/components/section/section-wrapper'
import { Metadata } from 'next'
import React from 'react'
import OnThisPageSection from '@/components/section/onthispage-section'
import { OnThisPageHeadings } from '@/lib/mdx'
import DocsMainContentWrapper from '@/components/section/docs-main-content-wrapper'

export const metadata: Metadata = {
    title: "Fysk Provider - Fysk",
    description: "Global configuration and state management for Fysk components.",
}

const toc: OnThisPageHeadings[] = [
    { level: 2, text: 'About Fysk Provider', id: 'about-fysk-provider' },
    { level: 2, text: 'Why is it Necessary?', id: 'why-is-it-necessary' },
    { level: 2, text: 'Source Code', id: 'source-code' },
]

const fyskProviderCode = `"use client"
import * as React from "react"
import { Check, AlertCircle, AlertTriangle, Info, Loader, ChevronDown, ChevronUp, X } from "lucide-react"

export type FyskIconPosition = "start" | "end"

export interface FyskIcons {
    loading?: React.ReactNode
    success?: React.ReactNode
    error?: React.ReactNode
    warning?: React.ReactNode
    info?: React.ReactNode,
    chevronDown?: React.ReactNode,
    chevronUp?: React.ReactNode,
    close?: React.ReactNode,
}

export interface FyskConfig {
    icons?: FyskIcons
    iconPosition?: FyskIconPosition
}

const defaultIcons: Required<FyskIcons> = {
    loading: <Loader className="animate-spin" />,
    success: <Check />,
    error: <AlertCircle />,
    warning: <AlertTriangle />,
    info: <Info />,
    chevronDown: <ChevronDown />,
    chevronUp: <ChevronUp />,
    close: <X />
}

const FyskContext = React.createContext<FyskConfig>({
    icons: defaultIcons,
    iconPosition: "start",
})

export function useFyskConfig() {
    return React.useContext(FyskContext)
}

export interface FyskProviderProps extends FyskConfig {
    children: React.ReactNode
}

export function FyskProvider({
    children,
    icons,
    iconPosition = "start",
}: FyskProviderProps) {
    const value = React.useMemo(
        () => ({
            icons: { ...defaultIcons, ...icons },
            iconPosition,
        }),
        [icons, iconPosition]
    )

    return <FyskContext.Provider value={value}>{children}</FyskContext.Provider>
}
`

const FyskProviderPage = () => {
    return (
        <DocsMainContentWrapper toc={toc}>
            <div>
                <Typography variant="h1" className="mb-4">Fysk Provider</Typography>
                <Typography variant="lead">
                    The central nervous system of your application, providing global configuration and consistent state for all Fysk components.
                </Typography>
            </div>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="about-fysk-provider">About Fysk Provider</Typography>
                <Typography className="mb-4">
                    The Fysk Provider is a crucial component that wraps your application or specific sections of it. It serves as the &quot;built-in brain&quot; for Fysk components, creating a shared context that manages:
                </Typography>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                    <li><strong className="text-foreground">Global Icons:</strong> Defines a standard set of status icons (loading, success, error, etc.) used across all components.</li>
                    <li><strong className="text-foreground">Configuration:</strong> Manages preferences like icon positioning needed by various inputs and displays.</li>
                    <li><strong className="text-foreground">Consistency:</strong> Ensures that every component behaves and looks uniform without repetitive prop passing.</li>
                </ul>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="why-is-it-necessary">Why is it Necessary?</Typography>
                <Typography className="mb-4">
                    In a modern, component-driven architecture, passing common assets (like icons or theme settings) to every single leaf component is inefficient and error-prone. The Fysk Provider solves this by injecting these dependencies from the top down.
                </Typography>
                <Typography className="mb-4">
                    This &quot;better&quot; approach means:
                </Typography>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                    <li><strong className="text-foreground">Instant Updates:</strong> Change an icon in the provider, and it updates in every button, input, and alert across your app.</li>
                    <li><strong className="text-foreground">Clean API:</strong> Your component usage remains clean (e.g., just `&lt;Button state=&quot;loading&quot; /&gt;`) because the component knows where to find the loading spinner.</li>
                    <li><strong className="text-foreground">Smart Defaults:</strong> It comes pre-configured with Lucide React icons, so you can start building beautiful UIs immediately without setup fatigue.</li>
                </ul>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="source-code">Source Code</Typography>
                <Typography className="mb-4">
                    Copy this code into `components/fysk-provider.tsx` (or your preferred location) and wrap your root layout with it.
                </Typography>
                <CodeBlock
                    language="typescript"
                    code={fyskProviderCode}
                />
            </SectionContainerWrapper>
        </DocsMainContentWrapper>
    )
}

export default FyskProviderPage
