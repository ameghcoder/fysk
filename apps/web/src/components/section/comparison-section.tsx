
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@fysk/ui';
import { Check, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ComparisonSection = () => {
    const features = [
        { name: "State Management", shadcn: "DIY (50+ lines)", fysk: "One prop", highlighted: true },
        { name: "Loading States", shadcn: false, fysk: true },
        { name: "Success Feedback", shadcn: false, fysk: true },
        { name: "Error Handling", shadcn: false, fysk: true },
        { name: "Micro-animations", shadcn: false, fysk: true },
        { name: "Global Icon Config", shadcn: false, fysk: true },
    ];

    return (
        <section className="w-full py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10" />

            <div className="text-center mb-16">
                <Typography variant="h2" className="text-3xl md:text-6xl font-black tracking-tighter mb-6 selection:bg-white selection:text-black">
                    The Next Evolution.
                </Typography>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Fysk isn&apos;t a replacement for shadcn/ui, it&apos;s the upgrade.
                    We took the foundation you love and added the intelligence it was missing.
                </p>
            </div>

            <div className="relative border border-white/5 bg-zinc-950/40 backdrop-blur-xl rounded-3xl p-1 md:p-8">
                {/* Mobile Scroll Indicator */}
                <div className="md:hidden text-center text-xs text-zinc-500 mb-4 flex items-center justify-center gap-2">
                    Scroll to compare <ArrowRight className="size-3" />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2 max-w-none!">
                        <thead>
                            <tr>
                                <th className="p-6 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Architecture</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Foundations</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-[0.2em] text-white">Fysk <span className="text-[10px] ml-2 px-2 py-0.5 bg-white/10 rounded-full border border-white/10 uppercase tracking-normal">Pro</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, idx) => (
                                <motion.tr
                                    key={feature.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    viewport={{ once: true }}
                                    className={cn(
                                        "group transition-all duration-300",
                                        feature.highlighted ? "bg-white/3" : "hover:bg-white/2"
                                    )}
                                >
                                    <td className="p-6">
                                        <span className="text-zinc-100 font-medium group-hover:text-white transition-colors">
                                            {feature.name}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        {typeof feature.shadcn === "string" ? (
                                            <span className="text-zinc-500 font-mono text-sm">{feature.shadcn}</span>
                                        ) : feature.shadcn ? (
                                            <Check className="text-zinc-400 size-5" />
                                        ) : (
                                            <div className="flex items-center gap-2 opacity-30">
                                                <X className="size-4" />
                                                <span className="text-[10px] uppercase font-bold tracking-wider">Manual</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-6">
                                        {typeof feature.fysk === "string" ? (
                                            <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-full border border-white/10 text-sm">
                                                {feature.fysk}
                                            </span>
                                        ) : feature.fysk ? (
                                            <div className="flex items-center gap-3">
                                                <div className="size-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                                                    <Check className="text-white size-3" />
                                                </div>
                                                <span className="text-xs uppercase font-black tracking-widest text-white">Integrated</span>
                                            </div>
                                        ) : (
                                            <X className="text-destructive size-5" />
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};
