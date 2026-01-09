import SectionContainerWrapper from '@/components/section/section-wrapper'
import { Card, CardContent, CardHeader, CardTitle, Typography } from '@fysk/ui'
import { Metadata } from 'next'
import Link from 'next/link'
import { Twitter, Linkedin, Github, Atom, Layers, LayoutTemplate } from 'lucide-react'
import { OnThisPageHeadings } from '@/lib/mdx'
import DocsMainContentWrapper from '@/components/section/docs-main-content-wrapper'

export const metadata: Metadata = {
    title: "Request a Component - Fysk",
    description: "Request new UI components for the Fysk library. Share your ideas on social media and help shape the future of Fysk.",
}

const toc: OnThisPageHeadings[] = [
    { level: 2, text: 'How to Request', id: 'how-to-request' },
    { level: 2, text: 'Component Types', id: 'component-types' },
    { level: 2, text: 'What to Include', id: 'what-to-include' },
]

const requestMethods = [
    {
        title: "Twitter / X",
        href: "https://twitter.com/yrjdev",
        icon: Twitter,
        handle: "@YRJDEV",
        description: "Create and Share a post and Tag me"
    },
    {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/yrjdeveloper",
        icon: Linkedin,
        handle: "@Yashraj",
        description: "Create and Share a post and Tag me"
    },
    {
        title: "GitHub",
        href: "https://github.com/ameghcoder/fysk/issues/new?template=component_request.md&title=[Component Request]",
        icon: Github,
        handle: "@AmeghCoder",
        description: "Open an Issue"
    },
]

const RequestAComponent = () => {
    return (
        <DocsMainContentWrapper toc={toc}>
            <div>
                <Typography variant="h1" className="mb-4">Request a Component</Typography>
                <Typography variant="lead">
                    Have an idea for a component that would make Fysk even better? We&apos;d love to hear from you. Share your request on social media and help shape the future of the library.
                </Typography>
            </div>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="how-to-request">How to Request</Typography>
                <Typography className="mb-6">
                    Fysk is a community-driven project, and your ideas matter. To request a new component, you can post on <strong>Twitter (X)</strong> or <strong>LinkedIn</strong> and tag me, or open an issue directly on <strong>GitHub</strong>. This keeps everything transparent and allows others to interact and provide feedback or similar needs.
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {
                        requestMethods.map((data) => (
                            <Link key={data.href} href={data.href} target="_blank" rel="noopener noreferrer" className="group no-underline">
                                <Card variant={'secondary'} className="hover:bg-muted/50 transition-all hover:border-primary/50 border-border/60 h-full">
                                    <CardContent className="p-5 flex flex-col items-start gap-4">
                                        <div className='flex items-center gap-4'>
                                            <div className="p-3 rounded-lg bg-[#1DA1F2]/10 text-primary group-hover:bg-[#1DA1F2]/20 transition-colors">
                                                <data.icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <Typography className="font-semibold m-0">{data.title}</Typography>
                                                <Typography variant="small" className="text-muted-foreground">{data.handle}</Typography>
                                            </div>
                                        </div>
                                        <Typography variant="small" className="text-muted-foreground">{data.description}</Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                    }
                </div>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="component-types">Component Types</Typography>
                <Typography className="mb-6">
                    When making a request, it helps to know what type of component you&apos;re looking for. Fysk organizes its library into three tiers:
                </Typography>

                <div className="grid grid-cols-1 gap-4">
                    <Card variant="secondary">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Atom className="h-5 w-5" />
                                </div>
                                <CardTitle>Atom</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Typography variant="p" className="text-muted-foreground">
                                The smallest, most fundamental UI elements. Think buttons, inputs, badges, tooltips, and typography. These are the building blocks that compose everything else.
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card variant="secondary">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Layers className="h-5 w-5" />
                                </div>
                                <CardTitle>Molecule</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Typography variant="p" className="text-muted-foreground">
                                Larger, more complex components made by combining multiple atoms. Examples include hero sections, file upload zones, pricing cards, authentication forms, or navigation headers.
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card variant="secondary">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <LayoutTemplate className="h-5 w-5" />
                                </div>
                                <CardTitle>Material</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Typography variant="p" className="text-muted-foreground">
                                Full page layouts and templates built using atoms and molecules. These are ready-to-use starting points for dashboards, landing pages, settings screens, and more.
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="what-to-include">What to Include in Your Request</Typography>
                <Typography className="mb-4">
                    To help me understand your vision and build exactly what you need, try to include:
                </Typography>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">Component Name:</strong> What would you call it?</li>
                    <li><strong className="text-foreground">Type:</strong> Is it an Atom, Molecule, or Material?</li>
                    <li><strong className="text-foreground">Use Case:</strong> Where would you use this component? What problem does it solve?</li>
                    <li><strong className="text-foreground">Inspiration (optional):</strong> Any reference links, screenshots, or examples from other libraries?</li>
                    <li><strong className="text-foreground">Special Features:</strong> Any specific states, animations, or accessibility considerations?</li>
                </ul>

                <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/50">
                    <Typography variant="small" className="text-muted-foreground">
                        <strong className="text-foreground">Tip:</strong> The more detail you provide, the faster I can turn your idea into reality. Don&apos;t hesitate to share rough sketches or mockups if you have them!
                    </Typography>
                </div>
            </SectionContainerWrapper>
        </DocsMainContentWrapper>
    )
}

export default RequestAComponent
