import SectionContainerWrapper from '@/components/section/section-wrapper'
import { Card, CardContent, CardHeader, CardTitle, Typography } from '@fysk/ui'
import Link from 'next/link'
import { Metadata } from 'next'
import { OnThisPageHeadings } from '@/lib/mdx'
import DocsMainContentWrapper from '@/components/section/docs-main-content-wrapper'

export const metadata: Metadata = {
    title: "Getting Started - Fysk",
    description: "Learn how to get started with Fysk, a Polished React UI component library with built-in state management.",
}

const toc: OnThisPageHeadings[] = [
    { level: 2, text: 'Prerequisites', id: 'prerequisites' },
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
                <Typography variant="h2" className="mb-4" id="how-it-works">How it works</Typography>
                <Typography className="mb-4">
                    Fysk follows the <span className="italic">copy-paste</span> distribution method popularized by shadcn/ui.
                    Instead of installing a large dependencies,
                    you add individual component files to your project.
                </Typography>
                <Card variant={"glass"}>
                    <CardHeader>
                        <CardTitle>
                            <Typography variant="small">Why this approach?</Typography>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Typography variant="list" data={[
                            <Typography key="ownership"><Typography variant="strong">Ownership:</Typography> The code is yours. Customize styles and logic without wrestling with library internals.</Typography>,
                            <Typography key="bundle-size"><Typography variant="strong">Bundle Size:</Typography> No unused code bloat. Only include what you use.</Typography>,
                            <Typography key="flexibility"><Typography variant="strong">Flexibility:</Typography> Mix and match with other libraries seamlessly.</Typography>,
                        ]} />
                    </CardContent>
                </Card>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="next-steps">Next Steps</Typography>
                <Typography>
                    Ready to start building? Head over to the <Link href="/docs/quick-start" className="text-primary hover:underline font-medium">Quick Start</Link> guide to get up and running in 2 minutes.
                </Typography>
            </SectionContainerWrapper>

        </DocsMainContentWrapper>
    )
}

export default GettingStarted


