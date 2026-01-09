import SectionContainerWrapper from '@/components/section/section-wrapper'
import { Typography } from '@fysk/ui'
import Link from 'next/link'
import { Metadata } from 'next'
import { OnThisPageHeadings } from '@/lib/mdx'
import DocsMainContentWrapper from '@/components/section/docs-main-content-wrapper'

export const metadata: Metadata = {
    title: "Getting Started - Fysk",
    description: "Learn how to get started with Fysk, a premium React UI component library with built-in state management.",
}

const toc: OnThisPageHeadings[] = [
    { level: 2, text: 'Prerequisites', id: 'prerequisites' },
    { level: 2, text: 'Why "Atoms"?', id: 'why-atoms' },
    { level: 2, text: 'How it works', id: 'how-it-works' },
    { level: 2, text: 'Next Steps', id: 'next-steps' },
]

const GettingStarted = () => {
    return (
        <DocsMainContentWrapper toc={toc}>
            <div>
                <Typography variant="h1" className="mb-4">Getting Started</Typography>
                <Typography variant="lead">
                    Welcome to the Fysk documentation. This guide will help you get setup and ready to build beautiful interfaces with built in state handling and accessibility in seconds.
                </Typography>
            </div>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="prerequisites">Prerequisites</Typography>
                <Typography className="mb-4">
                    Fysk is built for the modern React ecosystem. Before you begin, ensure you have a project set up with the following:
                </Typography>
                <Typography
                    variant={"list"}
                    data={[
                        <Typography key="pre-req-react"><Typography variant="strong" className="text-foreground">React 18+</Typography> or Next.js 13+ (App Router recommended)</Typography>,
                        <Typography key="pre-req-tailwind"><Typography variant="strong" className="text-foreground">Tailwind CSS (v4 Recommended)</Typography> for styling</Typography>,
                        <Typography key="pre-req-typescript"><Typography variant="strong" className="text-foreground">TypeScript</Typography> (highly recommended)</Typography>,
                        <Typography key="pre-req-lucide"><Typography variant="strong" className="text-foreground">Lucide React</Typography> for icons</Typography>,
                        <Typography key="pre-req-shadcn"><Typography variant="strong" className="text-foreground">ShadCN CLI</Typography> for component installation</Typography>,
                    ]}
                />
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="why-atoms">Why I named them &quot;Atoms&quot; instead of &quot;Components&quot;</Typography>
                <Typography>
                    Because, atoms are the smallest part of our universe, in the same way these components are the smallest part of our UI and designs.
                </Typography>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="how-it-works">How it works</Typography>
                <Typography className="mb-4">
                    Fysk follows the <span className="italic">copy-paste</span> distribution method popularized by shadcn/ui.
                    Instead of installing a large dependencies,
                    you add individual component files to your project.
                </Typography>
                <div className="bg-card/50 border border-border rounded-lg p-4 mt-4">
                    <Typography variant="small" className="font-semibold block mb-2">Why this approach?</Typography>
                    <ul className="list-image-none space-y-2 text-sm text-muted-foreground">
                        <li>1. <strong>Ownership:</strong> The code is yours. Customize styles and logic without wrestling with library internals.</li>
                        <li>2. <strong>Bundle Size:</strong> No unused code bloat. Only include what you use.</li>
                        <li>3. <strong>Flexibility:</strong> Mix and match with other libraries seamlessly.</li>
                    </ul>
                </div>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="next-steps">Next Steps</Typography>
                <Typography>
                    Ready to start building? Head over to the <Link href="/docs/installation" className="text-primary hover:underline font-medium">Installation</Link> guide to configure your project.
                </Typography>
            </SectionContainerWrapper>

        </DocsMainContentWrapper>
    )
}

export default GettingStarted
