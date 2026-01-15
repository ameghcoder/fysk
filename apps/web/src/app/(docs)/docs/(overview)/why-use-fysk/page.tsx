import SectionContainerWrapper from '@/components/section/section-wrapper'
import { Card, CardContent, CardHeader, CardTitle, Typography } from '@fysk/ui'
import { Metadata } from 'next'
import { OnThisPageHeadings } from '@/lib/mdx'
import DocsMainContentWrapper from '@/components/section/docs-main-content-wrapper'

export const metadata: Metadata = {
    title: "Why Use Fysk? - Fysk",
    description: "Discover the philosophy behind Fysk: stateful components with built-in state management and aesthetic intelligence.",
}

const TOC: OnThisPageHeadings[] = [
    { level: 2, text: 'Stateful Components', id: 'stateful-components' },
    { level: 2, text: 'Aesthetic Intelligence', id: 'aesthetic-intelligence' },
    { level: 2, text: 'The "Copy Paste" Freedom', id: 'the-copy-paste-freedom' },
]

const WhyUseFysk = () => {
    return (
        <DocsMainContentWrapper toc={TOC}>
            <div>
                <Typography variant="h1" className="mb-4">Why Use Fysk?</Typography>
                <Typography variant="lead">
                    Fysk was born from a simple frustration: rewriting the same state logic for every new project.
                    It&apos;s a UI library designed to be <Typography variant="strong">stateful</Typography> giving you components with built-in <Typography variant="strong">state management</Typography> that react intelligently out of the box.
                </Typography>
            </div>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="stateful-components">Stateful Components</Typography>
                <Typography className="mb-4">
                    In most libraries, a button is just a button. You have to manually wire up the loading spinners, disable states, success icons, and error handling every single time.
                </Typography>
                <Typography className="mb-6">
                    Fysk takes a different approach. We bake the <Typography variant="strong">micro-logic</Typography> directly into the component.
                    An input shouldn&apos;t just accept text; it should know how to show a valid state, an error shake, or a loading skeleton without you writing a wrapper component for the 100th time.
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card variant={'glass'}>
                        <CardHeader>
                            <CardTitle>
                                Stateful Logic
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Typography variant="p">
                                Buttons that handle their own loading promises, Inputs that auto-format, and forms that validate visually.
                                We handle the boring logic so you don&apos;t have to.
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card variant={'glass'}>
                        <CardHeader>
                            <CardTitle>
                                Visual Feedback
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Typography variant="p" >
                                The interface communicates with the user. Success, error, and pending states aren&apos;t just logical flags—they are distinct, designed visual transformations.
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="aesthetic-intelligence">Aesthetic Intelligence</Typography>
                <Typography>
                    Intelligence doesn&apos;t mean boring. Fysk combines this robust logic with a **polished, glassmorphic design language**.
                    We believe that internal dashboards and developer tools deserve the same level of polish as top-tier consumer products.
                    High-end visuals meet high-end logic.
                </Typography>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="the-copy-paste-freedom">The &quot;Copy Paste&quot; Freedom</Typography>
                <Typography>
                    Despite the extra functionality, Fysk stays true to the shadcn/ui philosophy. You own the code.
                    Copy the component into your project and you have full control.
                    If the built-in logic does something you don&apos;t like, just change it. You aren&apos;t fighting a compiled <Typography variant={"inlineCode"}>npm package;</Typography> you are extending your own codebase.
                </Typography>
            </SectionContainerWrapper>
        </DocsMainContentWrapper>
    )
}

export default WhyUseFysk


