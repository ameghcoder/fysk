import { Typography } from '@fysk/ui'
import CodeBlock from '@/components/layout/code-block'
import SectionContainerWrapper from '@/components/section/section-wrapper'
import { Metadata } from 'next'
import React from 'react'
import DocsMainContentWrapper from '@/components/section/docs-main-content-wrapper'
import { OnThisPageHeadings } from '@/lib/mdx'
import Link from 'next/link'

export const metadata: Metadata = {
    title: "Fysk Provider - Fysk",
    description: "Global configuration and state management for Fysk components.",
}

const toc: OnThisPageHeadings[] = [
    { level: 2, text: 'About Fysk Provider', id: 'about-fysk-provider' },
    { level: 2, text: 'Why is it Necessary?', id: 'why-is-it-necessary' },
    { level: 2, text: 'Basic Setup', id: 'basic-setup' },
    { level: 2, text: 'Animation Configuration', id: 'animation-configuration' },
    { level: 3, text: 'Duration Presets', id: 'duration-presets' },
    { level: 3, text: 'Easing Presets', id: 'easing-presets' },
    { level: 3, text: 'Effect Settings', id: 'effect-settings' },
    { level: 2, text: 'Icon Configuration', id: 'icon-configuration' },
]

const basicSetupCode = `"use client"

import { FyskProvider } from "@fysk/ui"
import { AnimatePresence, motion } from "framer-motion"

// you can add your more provider here, if you want to keep them on client side
export function FyskClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <FyskProvider
            animations={{
                enabled: true,
                motion: motion,
                AnimatePresence: AnimatePresence,
            }}
        >
            {children}
        </FyskProvider>
    )
}`

const animationConfigCode = `<FyskProvider
    animations={{
        // Master switch to enable/disable all animations
        enabled: true,
        
        // Required: Pass framer-motion objects
        motion: motion,
        AnimatePresence: AnimatePresence,
        
        // Optional: Customize durations (in seconds)
        durations: {
            instant: 0.1,   // Ultra-fast micro-interactions
            fast: 0.15,     // Quick feedback animations
            normal: 0.2,    // Standard UI transitions
            slow: 0.3,      // Deliberate, noticeable animations
            layout: 0.4,    // Layout/morphing animations
        },
        
        // Optional: Customize easings
        easings: {
            enter: "easeOut",    // For entering elements
            exit: "easeOut",     // For exiting elements
            layout: "easeInOut", // For morphing/size changes
            hover: "easeOut",    // For hover interactions
            linear: "linear",    // For constant animations
        },
        
        // Optional: Customize visual effects
        effects: {
            blur: true,          // Enable blur on transitions
            blurAmount: 4,       // Blur intensity (px)
            scale: true,         // Enable scale on transitions
            scaleAmount: 0.95,   // Scale amount
            slide: true,         // Enable slide effect
            slideDistance: 10,   // Slide distance (px)
        },
    }}
>
    {children}
</FyskProvider>`

const iconConfigCode = `<FyskProvider
    // Override default icons
    icons={{
        loading: <MyCustomSpinner />,
        success: <MyCheckIcon />,
        error: <MyErrorIcon />,
        // ... other icons
    }}
    
    // Set global icon position
    iconPosition="start" // or "end"
    
    animations={{ enabled: true, motion, AnimatePresence }}
>
    {children}
</FyskProvider>`

const FyskProviderPage = () => {
    return (
        <DocsMainContentWrapper toc={toc}>
            <div>
                <Typography variant="h1" className="mb-4">Fysk Provider</Typography>
                <Typography variant="lead">
                    The central nervous system of your application, providing global configuration for icons, animations, and consistent state for all Fysk components.
                </Typography>
            </div>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="about-fysk-provider">About Fysk Provider</Typography>
                <Typography className="mb-4">
                    The Fysk Provider is a crucial component that wraps your application or specific sections of it. It serves as the &quot;Built-in state management&quot; for Fysk components, creating a shared context that manages:
                </Typography>
                <Typography variant={"list"} data={[
                    <Typography key="global-icons"><Typography variant={"strong"}>Global Icons:</Typography> Defines a standard set of status icons (loading, success, error, etc.) used across all components.</Typography>,
                    <Typography key="animation"><Typography variant={"strong"}>Animation Control:</Typography> Centralized animation configuration including durations, easings, and visual effects.</Typography>,
                    <Typography key="configuration"><Typography variant={"strong"}>Configuration:</Typography> Manages preferences like icon positioning needed by various inputs and displays.</Typography>,
                    <Typography key="consistency"><Typography variant={"strong"}>Consistency:</Typography> Ensures that every component behaves and looks uniform without repetitive prop passing.</Typography>
                ]} />

            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="why-is-it-necessary">Why is it Necessary?</Typography>
                <Typography className="mb-4">
                    In a modern, component-driven architecture, passing common assets (like icons or animation settings) to every single leaf component is inefficient and error-prone. The Fysk Provider solves this by injecting these dependencies from the top down.
                </Typography>
                <Typography className="mb-4">
                    This &quot;better&quot; approach means:
                </Typography>
                <Typography variant="list" data={[
                    <Typography key="instant-updates"><Typography variant="strong">Instant Updates:</Typography> Change an icon or animation timing in the provider, and it updates in every button, input, and alert across your app.</Typography>,
                    <Typography key="clean-api"><Typography variant="strong">Clean API:</Typography> Your component usage remains clean (e.g., just <Typography variant="inlineCode">{`<Button state="loading" />`}</Typography>) because the component knows where to find the loading spinner.</Typography>,
                    <Typography key="tree-shaking"><Typography variant="strong">Tree-Shaking:</Typography> When animations are disabled, framer-motion is never imported by components, keeping your bundle lean.</Typography>,
                    <Typography key="stateful-defaults"><Typography variant="strong">Stateful Defaults:</Typography> It comes pre-configured with Lucide React icons and professional animation timings, so you can start building beautiful UIs immediately.</Typography>
                ]} />
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="basic-setup">Basic Setup</Typography>
                <Typography className="mb-4">
                    Create a client-side <Typography variant="inlineCode">Providers</Typography> component and wrap your root layout with it:
                </Typography>
                <CodeBlock
                    language="typescript"
                    code={basicSetupCode}
                />
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="animation-configuration">Animation Configuration</Typography>
                <Typography className="mb-4">
                    The <Typography variant="inlineCode">animations</Typography> prop gives you fine-grained control over how all Fysk components animate. All values have sensible defaults based on <a referrerPolicy='no-referrer' href="https://animations.dev/learn/animation-theory/the-easing-blueprint">The Easing Blueprint</a>.
                </Typography>
                <CodeBlock
                    language="typescript"
                    code={animationConfigCode}
                />
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h3" className="mb-4" id="duration-presets">Duration Presets</Typography>
                <Typography className="mb-4">
                    Control animation speed across your entire application:
                </Typography>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-2 px-3 font-semibold">Key</th>
                                <th className="text-left py-2 px-3 font-semibold">Default</th>
                                <th className="text-left py-2 px-3 font-semibold">Use Case</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">instant</Typography></td>
                                <td className="py-2 px-3">0.1s</td>
                                <td className="py-2 px-3">Micro-interactions (hover, focus)</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">fast</Typography></td>
                                <td className="py-2 px-3">0.15s</td>
                                <td className="py-2 px-3">Quick feedback (button clicks)</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">normal</Typography></td>
                                <td className="py-2 px-3">0.2s</td>
                                <td className="py-2 px-3">Standard transitions (state changes)</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">slow</Typography></td>
                                <td className="py-2 px-3">0.3s</td>
                                <td className="py-2 px-3">Deliberate animations (modals)</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">layout</Typography></td>
                                <td className="py-2 px-3">0.4s</td>
                                <td className="py-2 px-3">Size/position changes (morphing)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h3" className="mb-4" id="easing-presets">Easing Presets</Typography>
                <Typography className="mb-4">
                    Control the &quot;feel&quot; of animations. Based on <a referrerPolicy='no-referrer' href="https://animations.dev/learn/animation-theory/the-easing-blueprint">The Easing Blueprint</a>:
                </Typography>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-2 px-3 font-semibold">Key</th>
                                <th className="text-left py-2 px-3 font-semibold">Default</th>
                                <th className="text-left py-2 px-3 font-semibold">Why</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">enter</Typography></td>
                                <td className="py-2 px-3">easeOut</td>
                                <td className="py-2 px-3">Feels responsive—quick start, smooth end</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">exit</Typography></td>
                                <td className="py-2 px-3">easeOut</td>
                                <td className="py-2 px-3">Clean exit without lingering</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">layout</Typography></td>
                                <td className="py-2 px-3">easeInOut</td>
                                <td className="py-2 px-3">Natural acceleration/deceleration</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">hover</Typography></td>
                                <td className="py-2 px-3">easeOut</td>
                                <td className="py-2 px-3">Instant response to user input</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">linear</Typography></td>
                                <td className="py-2 px-3">linear</td>
                                <td className="py-2 px-3">For spinners, progress bars</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h3" className="mb-4" id="effect-settings">Effect Settings</Typography>
                <Typography className="mb-4">
                    Toggle and customize visual effects that are applied during transitions:
                </Typography>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-2 px-3 font-semibold">Key</th>
                                <th className="text-left py-2 px-3 font-semibold">Default</th>
                                <th className="text-left py-2 px-3 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">blur</Typography></td>
                                <td className="py-2 px-3">true</td>
                                <td className="py-2 px-3">Enable blur during enter/exit</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">blurAmount</Typography></td>
                                <td className="py-2 px-3">4</td>
                                <td className="py-2 px-3">Blur intensity in pixels</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">scale</Typography></td>
                                <td className="py-2 px-3">true</td>
                                <td className="py-2 px-3">Enable scale during enter/exit</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">scaleAmount</Typography></td>
                                <td className="py-2 px-3">0.95</td>
                                <td className="py-2 px-3">Scale amount (0.95 = 95%)</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">slide</Typography></td>
                                <td className="py-2 px-3">true</td>
                                <td className="py-2 px-3">Enable slide during enter/exit</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="py-2 px-3"><Typography variant="inlineCode">slideDistance</Typography></td>
                                <td className="py-2 px-3">10</td>
                                <td className="py-2 px-3">Slide distance in pixels</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="icon-configuration">Icon Configuration</Typography>
                <Typography className="mb-4">
                    Override default icons and set global icon positioning:
                </Typography>
                <CodeBlock
                    language="typescript"
                    code={iconConfigCode}
                />
                <Typography className="mt-4">
                    See the <Link href="/docs/fysk-hook">useFyskAnimation Hook</Link> documentation for how components consume this configuration.
                </Typography>
            </SectionContainerWrapper>
        </DocsMainContentWrapper>
    )
}

export default FyskProviderPage
