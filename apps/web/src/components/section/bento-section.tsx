
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Component, Layers, Zap, Box, Sparkles, Cpu } from 'lucide-react';
import { Typography } from '@fysk/ui';
import { cn } from '@/lib/utils';

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
                "group relative overflow-hidden border border-white/5 bg-zinc-950/50 px-3 md:px-6 py-4 md:py-8 backdrop-blur-xl rounded-2xl",
                "hover:border-white/10 hover:bg-zinc-900/50 transition-all duration-500",
                className
            )}
        >
            {/* Dot Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="mb-4">
                    {children}
                </div>
                <div>
                    <Typography variant="h3" className="text-xl font-bold text-white mb-2 selection:bg-white selection:text-black">
                        {title}
                    </Typography>
                    {description && (
                        <p className="text-sm text-zinc-400 selection:bg-white/10">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent" />
            </div>
        </motion.div>
    );
};

export const BentoSection = () => {
    return (
        <div className="w-full py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[500px]">

                {/* Card 1: Stateful by Design */}
                <BentoCard
                    title="Integrated Intelligence"
                    description="Components aren't just shells. They manage their own lifecycle, providing instant feedback without the boilerplate."
                    className="md:col-span-2 min-h-[300px]"
                    delay={0.1}
                >
                    <div className="h-48 w-full flex items-center justify-center relative overflow-hidden bg-zinc-900/30 border border-white/5 rounded-xl">
                        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-transparent opacity-50" />
                        <div className="flex items-center gap-12 z-10">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative"
                            >
                                <div className="absolute inset-0 blur-2xl bg-primary/40 rounded-full" />
                                <Brain className="w-20 h-20 text-white relative z-10" />
                            </motion.div>
                            <div className="flex flex-col gap-3">
                                <motion.div animate={{ width: [100, 140, 100] }} transition={{ duration: 3, repeat: Infinity }} className="h-2 bg-white/20 rounded-full" />
                                <motion.div animate={{ width: [80, 110, 80] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} className="h-2 bg-white/10 rounded-full" />
                                <motion.div animate={{ width: [120, 90, 120] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="h-2 bg-white/15 rounded-full" />
                            </div>
                        </div>
                    </div>
                </BentoCard>

                {/* Card 2: One Prop Mastery */}
                <BentoCard
                    title="One Prop Mastery"
                    description="Control loading, success, and error states with a single `state` prop. Minimal code, maximum impact."
                    className="md:col-span-1 min-h-[300px]"
                    delay={0.2}
                >
                    <div className="h-48 w-full flex flex-col items-center justify-center gap-4 bg-zinc-900/30 border border-white/5 rounded-xl relative overflow-hidden">
                        <motion.div
                            className="w-4/5 p-4 bg-zinc-800/50 border border-white/10 rounded-lg flex items-center gap-3"
                            whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                            <div className="size-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                            <div className="h-2 w-24 bg-white/20 rounded-full" />
                        </motion.div>
                        <div className="w-4/5 p-4 bg-zinc-800/20 border border-white/5 rounded-lg flex items-center gap-3 opacity-40">
                            <div className="size-3 rounded-full bg-rose-500" />
                            <div className="h-2 w-16 bg-white/10 rounded-full" />
                        </div>
                        <Cpu className="absolute -bottom-6 -right-6 size-24 text-white/5" />
                    </div>
                </BentoCard>

                {/* Card 3: 10+ Premium Components */}
                <BentoCard
                    title="10+ Premium Components"
                    description="A curated set of highly polished components that follow the same stateful philosophy."
                    className="md:col-span-1 min-h-[300px]"
                    delay={0.3}
                >
                    <div className="h-48 w-full p-6 grid grid-cols-3 gap-3 bg-zinc-900/30 border border-white/5 rounded-xl">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.05 * i }}
                                className={cn(
                                    "rounded-md border border-white/5",
                                    i % 3 === 0 ? "bg-white/10" : "bg-white/5"
                                )}
                            />
                        ))}
                    </div>
                </BentoCard>

                {/* Card 4: Universal Icon Support */}
                <BentoCard
                    title="Universal Support"
                    description="Whether you use Lucide, Radix Icons, or your own custom SVGs, Fysk handles them with ease."
                    className="md:col-span-2 min-h-[300px]"
                    delay={0.4}
                >
                    <div className="h-48 w-full flex items-center justify-around px-8 bg-zinc-900/30 border border-white/5 rounded-xl overflow-hidden relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 flex items-center justify-center opacity-[0.03]"
                        >
                            <Sparkles className="size-64 text-white" />
                        </motion.div>

                        {[Zap, Layers, Component, Box].map((Icon, i) => (
                            <motion.div
                                key={i}
                                className="p-5 bg-zinc-800/50 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all rounded-xl"
                                whileHover={{ y: -8, scale: 1.1 }}
                            >
                                <Icon className="w-10 h-10" />
                            </motion.div>
                        ))}
                    </div>
                </BentoCard>

            </div>
        </div>
    );
};
