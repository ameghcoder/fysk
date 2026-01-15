import React from 'react';
import { Typography } from '@fysk/ui';
import { SectionContainerScreenAnimated } from '@/components/section/section-wrapper';
import { Brain, Zap, Shield, Heart, LucideIcon } from 'lucide-react';

const ValueCard = ({ icon: Icon, title, description }: { icon: LucideIcon, title: string, description: string }) => (
    <div className="flex flex-col gap-4 p-6 border border-border/50 bg-secondary/30 backdrop-blur-sm rounded-xl">
        <div className="p-3 bg-primary/10 rounded-lg w-fit">
            <Icon className="w-6 h-6 text-primary" />
        </div>
        <Typography variant="h3" className="text-xl font-bold">{title}</Typography>
        <Typography className="text-muted-foreground">{description}</Typography>
    </div>
);

export default function AboutPage() {
    return (
        <div className="relative">
            <section className="relative w-full py-24 md:py-32 overflow-hidden bg-black">
                <div className="max-w-6xl mx-auto px-4 md:px-8 text-center relative z-10">
                    <Typography variant="h1" className="text-5xl md:text-8xl font-bold tracking-tight mb-8">
                        The Future of <span className="bg-block-gradient border border-border p-2">Development</span>
                    </Typography>
                    <Typography variant="p" className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
                        Fysk was born from a simple realization: components should be smarter, not just prettier.
                    </Typography>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
                </div>
            </section>

            <SectionContainerScreenAnimated>
                <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-24 space-y-24">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <Typography variant="h2" className="text-3xl md:text-5xl font-bold">Our Mission</Typography>
                            <Typography className="text-lg text-muted-foreground">
                                We believe that building modern UIs shouldn&apos;t require reinventing the wheel for every interaction.
                                While library like shadcn/ui gave us the perfect foundations, building stateful feedback remained a manual,
                                boilerplate-heavy task.
                            </Typography>
                            <Typography className="text-lg text-muted-foreground">
                                Fysk bridges this gap. We provide the same &quot;copy-paste&quot; freedom you love, but with a built-in brain
                                that handles the complexities of states, animations, and accessibility.
                            </Typography>
                        </div>
                        <div className="relative aspect-square bg-block-gradient border border-border rounded-2xl flex items-center justify-center p-12 order-first md:order-last">
                            <Brain className="w-full h-full text-primary/20 absolute inset-0 z-0 animate-pulse delay-200 duration-5000" />
                        </div>
                    </section>

                    <section className="space-y-12">
                        <div className="text-center">
                            <Typography variant="h2" className="text-3xl md:text-5xl font-bold mb-4">Our Values</Typography>
                            <p className="text-muted-foreground text-lg">The principles that guide every component we build.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ValueCard
                                icon={Zap}
                                title="Performance First"
                                description="Every component is optimized for speed and minimal bundle size. No overhead, just logic."
                            />
                            <ValueCard
                                icon={Shield}
                                title="Type Safe"
                                description="Built with TypeScript from the ground up. Precise types for a better developer experience."
                            />
                            <ValueCard
                                icon={Brain}
                                title="Smart Logic"
                                description="State management is baked in. No more manually toggling loading spinners."
                            />
                            <ValueCard
                                icon={Heart}
                                title="Community Driven"
                                description="Open source and built for the community. We grow together with your feedback."
                            />
                        </div>
                    </section>
                </main>
            </SectionContainerScreenAnimated>
        </div>
    );
}
