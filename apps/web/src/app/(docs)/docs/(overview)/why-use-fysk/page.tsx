import SectionContainerWrapper from '@/components/section/section-wrapper'
import { Card, CardContent, CardHeader, CardTitle, Typography } from '@fysk/ui'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Why Use Fysk? - Fysk",
    description: "Discover the philosophy behind Fysk: components with a built-in brain and aesthetic intelligence.",
}

const WhyUseFysk = () => {
    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl">
            <div>
                <Typography variant="h1" className="mb-4">Why Use Fysk?</Typography>
                <Typography variant="lead">
                    Fysk was born from a simple frustration: rewriting the same state logic for every new project.
                    It&apos;s a UI library designed to be smart - giving you components with a &quot;built-in brain&quot; that react intelligently to their state.
                </Typography>
            </div>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4">Components with a Brain</Typography>
                <Typography className="mb-4">
                    In most libraries, a button is just a button. You have to manually wire up the loading spinners, disable states, success icons, and error handling every single time.
                </Typography>
                <Typography className="mb-6">
                    Fysk takes a different approach. We bake the &quot;micro-logic&quot; directly into the component.
                    An input shouldn&apos;t just accept text; it should know how to show a valid state, an error shake, or a loading skeleton without you writing a wrapper component for the 100th time.
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card variant={'outline'}>
                        <CardHeader>
                            <CardTitle>
                                Smart States
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Typography variant="p">
                                Buttons that handle their own loading promises, Inputs that auto-format, and forms that validate visually.
                                We handle the boring logic so you don&apos;t have to.
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card variant={'outline'}>
                        <CardHeader>
                            <CardTitle>
                                Visual Feedback
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Typography variant="p" >
                                The interface communicates with the user. Success, error, and pending states aren&apos;t just logical flags they are distinct, designed visual transformations.
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4">Aesthetic Intelligence</Typography>
                <Typography>
                    Intelligence doesn&apos;t mean boring. Fysk combines this robust logic with a premium, glassmorphic design language.
                    We believe that internal dashboards and developer tools deserve the same level of polish as top-tier consumer products.
                    High-end visuals meet high-end logic.
                </Typography>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4">The &quot;Copy Paste&quot; Freedom</Typography>
                <Typography>
                    Despite the extra smarts, Fysk stays true to the shadcn/ui philosophy. You own the code.
                    Copy the component into your project and you have full control.
                    If the &quot;brain&quot; does something you don&apos;t like, just change it. You aren&apos;t fighting a compiled <Typography variant={"inlineCode"}>npm package;</Typography> you are extending your own codebase.
                </Typography>
            </SectionContainerWrapper>
        </div>
    )
}

export default WhyUseFysk
