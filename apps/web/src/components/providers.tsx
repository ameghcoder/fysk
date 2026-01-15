"use client"

import { FyskProvider } from "@fysk/ui";
import { ThemeProvider } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <FyskProvider
                animations={{
                    // Master switch to enable/disable all animations
                    enabled: true,
                    // Pass framer-motion objects
                    motion: motion,
                    AnimatePresence: AnimatePresence,
                    // Optional: Customize durations (in seconds)
                    // durations: {
                    //     instant: 0.1,
                    //     fast: 0.15,
                    //     normal: 0.2,
                    //     slow: 0.3,
                    //     layout: 0.4,
                    // },
                    // Optional: Customize easings
                    // easings: {
                    //     enter: "easeOut",
                    //     exit: "easeOut",
                    //     layout: "easeInOut",
                    //     hover: "easeOut",
                    //     linear: "linear",
                    // },
                    // Optional: Customize effects
                    // effects: {
                    //     blur: true,
                    //     blurAmount: 4,
                    //     scale: true,
                    //     scaleAmount: 0.95,
                    //     slide: true,
                    //     slideDistance: 10,
                    // },
                }}
            >
                {children}
            </FyskProvider>
        </ThemeProvider>
    );
}
