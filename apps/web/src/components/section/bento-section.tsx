'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Component, Layers, Zap, Activity, Box } from 'lucide-react';
import { Typography } from '@fysk/ui';
import { cn } from '@/lib/utils';
import BgGradient from '../effects/bg-gradient';

const BentoCard = ({
    children,
    className,
    title,
    description,
    delay = 0
}: {
    children: React.ReactNode;
    className?: string;
    title: string;
    description?: string;
    delay?: number;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            className={cn(
                "group relative overflow-hidden border border-border/50 bg-secondary/75 px-3 md:px-6 py-4 md:py-8 backdrop-blur-sm",
                "hover:border-border/0 hover:bg-secondary transition-colors duration-500",
                className
            )}
        >
            <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="mb-2">
                    {children}
                </div>
                <div>
                    <Typography variant="h3" className="text-xl font-bold text-foreground mb-1">
                        {title}
                    </Typography>
                    {description && (
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Hover Gradient Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" >
                <BgGradient position='absolute' colors={[]} darkThemeColors={["#BDBDBD"]} />
            </div>
        </motion.div>
    );
};

export const BentoSection = () => {
    return (
        <div className="w-full py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full min-h-[500px]">

                {/* Card 1: Built in Brain - Large (2 cols) */}
                <BentoCard
                    title="Built-in Brain"
                    description="Intelligent architecture that anticipates your needs while maintaining type safety."
                    className="md:col-span-2 min-h-[250px]"
                    delay={0.1}
                >
                    <div className="h-40 w-full flex items-center justify-center relative overflow-hidden  bg-background/50 border border-border">
                        <div className="grid grid-cols-2 gap-8 z-10">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Brain className="w-16 h-16 text-primary" />
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Activity className="w-16 h-16 text-foreground/50" />
                            </motion.div>
                        </div>
                    </div>
                </BentoCard>

                {/* Card 2: State Changes */}
                <BentoCard
                    title="State Aware"
                    description="Components that react and adapt to application state instantly."
                    className="md:col-span-1 min-h-[250px]"
                    delay={0.2}
                >
                    <div className="h-40 w-full flex flex-col items-center justify-center gap-4 bg-background/50  border border-border relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-b from-transparent to-primary/5" />

                        <motion.div
                            className="flex items-center gap-3 p-3 bg-secondary/50 border border-border w-3/4"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        >
                            <div className="w-3 h-3  bg-success animate-pulse" />
                            <div className="h-2 w-20 bg-foreground/20 " />
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-3 p-3 bg-secondary/50 border border-border w-3/4 opacity-50"
                        >
                            <div className="w-3 h-3  bg-destructive" />
                            <div className="h-2 w-16 bg-foreground/20 " />
                        </motion.div>
                    </div>
                </BentoCard>

                {/* Card 3: 10+ Components - Tall or Standard */}
                <BentoCard
                    title="10+ Components"
                    description="A comprehensive suite of premium components ready to drop in."
                    className="md:col-span-1 min-h-[250px]"
                    delay={0.3}
                >
                    <div className="h-40 w-full p-4 grid grid-cols-3 gap-2 bg-background/50  border border-border">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 * i }}
                                className={cn(
                                    "border border-border/50",
                                    i % 2 === 0 ? "bg-primary/20" : "bg-secondary/50"
                                )}
                            />
                        ))}
                    </div>
                </BentoCard>

                {/* Card 4: Icon Supported - Wide (2 cols) */}
                <BentoCard
                    title="Icon Support"
                    description="First-class support for generic and custom icon sets out of the box."
                    className="md:col-span-2 min-h-[250px]"
                    delay={0.4}
                >
                    <div className="h-40 w-full flex items-center justify-around px-8 bg-background/50  border border-border overflow-hidden relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-foreground/5 via-transparent to-transparent" />

                        {[Zap, Layers, Component, Box].map((Icon, i) => (
                            <motion.div
                                key={i}
                                className="p-4 bg-background/50 border border-border/50 text-foreground hover:text-primary hover:bg-background/10 hover:border-primary/50 transition-colors"
                                whileHover={{ y: -10, rotate: i % 2 === 0 ? 5 : -5 }}
                            >
                                <Icon className="w-8 h-8" />
                            </motion.div>
                        ))}
                    </div>
                </BentoCard>

            </div>
        </div>
    );
};
