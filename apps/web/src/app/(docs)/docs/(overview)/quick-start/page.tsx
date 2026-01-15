import { Card, CardContent, Typography } from '@fysk/ui'
import CodeBlock from '@/components/layout/code-block'
import Link from 'next/link'
import CustomBullet from '@/components/icons/custom-bullet'
import SectionContainerWrapper from '@/components/section/section-wrapper'
import { Metadata } from 'next'
import { OnThisPageHeadings } from '@/lib/mdx'
import DocsMainContentWrapper from '@/components/section/docs-main-content-wrapper'
import { Sparkles, Zap, Clock } from 'lucide-react'

export const metadata: Metadata = {
    title: "Quick Start - Fysk",
    description: "Get up and running with Fysk in under 2 minutes. The easiest way to add state-aware components to your project.",
}

const toc: OnThisPageHeadings[] = [
    { level: 2, text: 'Install a Component', id: 'install-a-component' },
    { level: 2, text: 'Add the Provider', id: 'add-the-provider' },
    { level: 2, text: 'Use It', id: 'use-it' },
    { level: 2, text: 'Optional: Enable Animations', id: 'optional-enable-animations' },
]

const providerCode = `// components/providers.tsx
"use client"

import { FyskProvider } from "@fysk/ui"

export function Providers({ children }: { children: React.ReactNode }) {
    return <FyskProvider>{children}</FyskProvider>
}`

const layoutCode = `// app/layout.tsx
import { Providers } from "@/components/providers"

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}`

const usageCode = `import { Button } from "@/components/ui/button"

export default function MyPage() {
    const [state, setState] = useState<"idle" | "loading" | "success">("idle")
    
    const handleClick = async () => {
        setState("loading")
        await saveData()
        setState("success")
    }
    
    return (
        <Button 
            state={state} 
            loadingText="Saving..."
            successText="Saved!"
            onClick={handleClick}
        >
            Save Changes
        </Button>
    )
}`

const animationsCode = `// components/providers.tsx
"use client"

import { FyskProvider } from "@fysk/ui"
import { motion, AnimatePresence } from "framer-motion"

export function Providers({ children }: { children: React.ReactNode }) {
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

const QuickStart = () => {
    return (
        <DocsMainContentWrapper toc={toc}>
            <div>
                <Typography variant="h1" className="mb-4">Quick Start</Typography>
                <Typography variant="lead">
                    Get up and running with Fysk in under 2 minutes.
                </Typography>
            </div>

            {/* Time indicator */}
            <Card variant="glass" className="mt-6 mb-8">
                <CardContent className="py-4">
                    <div className="flex items-center gap-6 flex-wrap">
                        <div className="flex items-center gap-2">
                            <Clock className="size-4 text-primary" />
                            <Typography variant={"small"} className="text-sm"><Typography variant="strong">Time:</Typography> ~2 minutes</Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="size-4 text-primary" />
                            <Typography variant={"small"} className="text-sm"><Typography variant="strong">Steps:</Typography> 3 (one is copy-paste)</Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4 text-primary" />
                            <Typography variant={"small"} className="text-sm"><Typography variant="strong">Result:</Typography> State-aware components</Typography>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <SectionContainerWrapper>
                <div className="flex items-center gap-4 mb-4">
                    <CustomBullet>1</CustomBullet>
                    <Typography variant="h3" className="mt-0" id="install-a-component">Install a Component</Typography>
                </div>
                <Typography className="mb-4">
                    Fysk uses the shadcn CLI. Run this to install the Button component:
                </Typography>
                <CodeBlock
                    language="bash"
                    code={`npx shadcn@latest add https://fysk.dev/r/button.json`}
                />
                <Typography className="mt-4 text-sm text-muted-foreground">
                    This automatically installs the component, FyskProvider, and all dependencies.
                </Typography>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <div className="flex items-center gap-4 mb-4">
                    <CustomBullet>2</CustomBullet>
                    <Typography variant="h3" className="mt-0" id="add-the-provider">Add the Provider</Typography>
                </div>
                <Typography className="mb-4">
                    Create a providers file and wrap your app. This is a <Typography variant="strong">one-time setup</Typography>:
                </Typography>
                <CodeBlock
                    language="tsx"
                    code={providerCode}
                />
                <Typography className="mt-4 mb-4 text-sm text-muted-foreground">
                    Then wrap your root layout:
                </Typography>
                <CodeBlock
                    language="tsx"
                    code={layoutCode}
                />
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <div className="flex items-center gap-4 mb-4">
                    <CustomBullet>3</CustomBullet>
                    <Typography variant="h3" className="mt-0" id="use-it">Use It!</Typography>
                </div>
                <Typography className="mb-4">
                    That&apos;s it! Now you can use state-aware components:
                </Typography>
                <CodeBlock
                    language="tsx"
                    code={usageCode}
                />
                <Typography className="mt-4">
                    The button automatically shows loading spinners, success icons, and transitions between states. <Typography variant="strong">No extra code needed.</Typography>
                </Typography>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="optional-enable-animations">Optional: Enable Smooth Animations</Typography>
                <Typography className="mb-4">
                    Want premium, buttery-smooth transitions? Add framer-motion:
                </Typography>
                <CodeBlock
                    language="bash"
                    code={`npm install framer-motion`}
                />
                <Typography className="mt-4 mb-4">
                    Then update your providers:
                </Typography>
                <CodeBlock
                    language="tsx"
                    code={animationsCode}
                />
                <Typography className="mt-4 text-sm text-muted-foreground">
                    Components automatically animate between states. See <Link href="/docs/fysk-provider" className="text-primary hover:underline">Fysk Provider</Link> for customization options.
                </Typography>
            </SectionContainerWrapper>

            {/* Next steps */}
            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4">Next Steps</Typography>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Link href="/docs/explore" className="block">
                        <Card variant="outline" className="h-full hover:border-primary transition-colors">
                            <CardContent className="pt-6">
                                <Typography variant="h4" className="mb-2">Explore Components</Typography>
                                <Typography className="text-sm text-muted-foreground">
                                    Browse all available components with live previews.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/docs/why-use-fysk" className="block">
                        <Card variant="outline" className="h-full hover:border-primary transition-colors">
                            <CardContent className="pt-6">
                                <Typography variant="h4" className="mb-2">Why Fysk?</Typography>
                                <Typography className="text-sm text-muted-foreground">
                                    Learn about built-in state management and the philosophy.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </SectionContainerWrapper>
        </DocsMainContentWrapper>
    )
}

export default QuickStart
