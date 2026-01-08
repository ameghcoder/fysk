import { Typography } from '@fysk/ui'
import CodeBlock from '@/components/layout/code-block'
import React from 'react'
import Link from 'next/link'
import CustomBullet from '@/components/icons/custom-bullet'
import SectionContainerWrapper from '@/components/section/section-wrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Installation - Fysk",
    description: "Step-by-step guide to installing Fysk components in your Next.js project.",
}

const Installation = () => {
    return (
        <div className="flex flex-col gap-8 w-full max-w-4xl">
            <div>
                <Typography variant="h1" className="mb-4">Installation</Typography>
                <Typography variant="lead">
                    Set up your project to start using Fysk components.
                </Typography>
            </div>

            <SectionContainerWrapper>
                <div className="flex items-center gap-4 mb-4">
                    <CustomBullet>1</CustomBullet>
                    <Typography variant="h3" className="mt-0">Create a Project</Typography>
                </div>
                <Typography className="mb-4">
                    Start by creating a new Next.js project using `create-next-app`.
                </Typography>
                <CodeBlock
                    className='mb-2!'
                    language="bash"
                    code={`npx create-next-app@latest my-app --typescript --tailwind --eslint`}
                />
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <div className="flex items-center gap-4 mb-4">
                    <CustomBullet>2</CustomBullet>
                    <Typography variant="h3" className="mt-0">Run the CLI Init</Typography>
                </div>
                <Typography className="mb-4">
                    Fysk is built on top of the shadcn/ui foundation. Run the `init` command to set up the base configuration, strict dependencies, and utility files.
                </Typography>
                <CodeBlock
                    className='mb-2!'
                    language="bash"
                    code={`npx shadcn@latest init`}
                />
                <div className="mt-4 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground border border-border/50">
                    <Typography variant="small" className="font-medium text-foreground">Configuration defaults:</Typography>
                    <ul className="mt-2 space-y-1 list-disc list-inside">
                        <li>Style: <strong>New York</strong></li>
                        <li>Base Color: <strong>Zinc</strong></li>
                        <li>CSS Variables: <strong>Yes</strong></li>
                    </ul>
                </div>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <div className="flex items-center gap-4 mb-4">
                    <CustomBullet>3</CustomBullet>
                    <Typography variant="h3" className="mt-0">Add Components</Typography>
                </div>
                <Typography className="mb-4">
                    You can now add components to your project. Browse the <Link href="/docs/atoms/react/home" className="text-primary hover:underline">Components</Link> section to find what you need.
                    <br /><br />
                    Currently, Fysk does not have a dedicated CLI. However, since we are compatible with the shadcn ecosystem, you can use the standard shadcn command pointing to our registry, or simply copy the code manually.
                </Typography>

                <Typography variant="h4" className="mb-2 mt-6">Option A: Via CLI (Recommended)</Typography>
                <Typography className="mb-2 text-sm text-muted-foreground">
                    On each component page, you will find a CLI command. Run it to install the component and its dependencies automatically.
                </Typography>
                <CodeBlock
                    className='mb-2!'
                    language="bash"
                    code={`npx shadcn@latest add https://fysk.dev/r/{component_name}.json`}
                />

                <Typography variant="h4" className="mb-2 mt-6">Option B: Manual Installation</Typography>
                <Typography className="mb-2 text-sm text-muted-foreground">
                    Copy the code from the &quot;Code&quot; tab on the component page into your project (Preview section contains the original code for component).
                </Typography>
            </SectionContainerWrapper>
        </div>
    )
}

export default Installation
