'use client'
import React from 'react'
import { motion } from "framer-motion";

const SectionContainerWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`border-t border-border py-2 md:py-6 ${className}`}>{children}</div>
    )
}

const SectionContainerScreenAnimated = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
                },
            }}
            initial="hidden"
            animate="visible"
            className={`min-h-screen h-fit w-full py-2 md:py-6 ${className}`}
        >
            {children}
        </motion.div>
    )
}

export default SectionContainerWrapper
export {
    SectionContainerScreenAnimated
}

