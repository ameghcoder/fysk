
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button, Typography } from '@fysk/ui';
import Link from 'next/link';

export const ExploreSection = () => {
    return (
        <section className="w-full py-12 relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-[500px] overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-950 group"
            >
                {/* Background Decor */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)]" />

                    {/* Animated Lines or just Static High-tech Look */}
                    <div className="absolute inset-0 opacity-[0.2]" style={{
                        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-8 space-y-10 group-hover:scale-[1.02] transition-transform duration-700">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <span className="text-xs font-bold tracking-[0.4em] uppercase text-zinc-500 mb-4 block">
                                Ready to build?
                            </span>
                            <Typography variant="h2" className="text-5xl md:text-8xl font-black tracking-tighter text-white selection:bg-white selection:text-black leading-tight">
                                Explore <br /> The Arsenal
                            </Typography>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="flex flex-col items-center gap-8"
                    >
                        <Typography variant="p" className="text-lg md:text-xl text-zinc-400 max-w-xl">
                            Join the developers building state-of-the-art interfaces with zero boilerplate.
                        </Typography>

                        <Button
                            variant="default"
                            size="lg"
                            className="h-16 px-10 rounded-full text-base font-bold bg-white text-black hover:bg-zinc-200 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95"
                            asChild
                        >
                            <Link href="/docs/explore">
                                Start Exploring <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Floating elements for depth */}
                <div className="absolute bottom-10 left-10 w-32 h-32 border border-white/5 rounded-full blur-2xl opacity-20" />
                <div className="absolute top-10 right-10 w-48 h-48 border border-white/10 rounded-full blur-3xl opacity-10" />
            </motion.div>
        </section>
    );
};
