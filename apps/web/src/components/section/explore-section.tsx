'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button, Typography } from '@fysk/ui';
import Link from 'next/link';
import BgGradient from '../effects/bg-gradient';

export const ExploreSection = () => {
    return (
        <section className="w-full py-4 relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-[400px] overflow-hidden border border-border shadow-2xl group"
            >
                {/* Background Gradient */}
                <BgGradient
                    colors={['#4F46E5', '#7C3AED', '#DB2777']}
                    darkThemeColors={['#8E0E00', '#FF0000']}
                    position="absolute"
                    opacity={1}
                />

                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 z-0 bg-background/40" />

                {/* Content */}
                <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center p-8 space-y-8">
                    <div className="overflow-hidden">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Typography variant="h2" className="text-5xl md:text-7xl font-bold tracking-tight text-foreground drop-shadow-2xl">
                                Explore Now
                            </Typography>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Typography variant="p" className="text-xl text-foreground/80 max-w-2xl mb-8">
                            Dive into the library and experience the future of component design.
                        </Typography>

                        <Button
                            variant="primary"
                            size="lg"
                            className="rounded-full px-8 py-6 text-lg group-hover:scale-105 transition-transform"
                            asChild
                        >
                            <Link href="/docs/explore">
                                Get Started <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};
