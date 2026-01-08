"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@fysk/ui"
import { AnimatePresence, motion } from "framer-motion"

export function ThemeToggle({
    className,
    variant = 'outline'
}: {
    className?: string;
    variant?: 'ghost' | 'secondary' | 'outline';
}) {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Wait until mounted on client to render theme-specific UI
    React.useEffect(() => {
        setMounted(true)
    }, [])

    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"

    return (
        <Button
            variant={variant}
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(nextTheme)}
            className={`${className}`}
            title={"Toggle theme"}
        >
            <AnimatePresence mode="wait" initial={false}>
                {mounted ? (
                    resolvedTheme === "dark" ? (
                        <motion.div
                            key="sun"
                            initial={{ opacity: 0, rotate: -90, scale: 0.5, y: -10 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
                            exit={{ opacity: 0, rotate: 90, scale: 0.5, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            <Sun className="size-4" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ opacity: 0, rotate: -90, scale: 0.5, y: -10 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
                            exit={{ opacity: 0, rotate: 90, scale: 0.5, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            <Moon className="size-4" />
                        </motion.div>
                    )
                ) : (
                    <div key="placeholder" className="size-4" />
                )}
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

export default ThemeToggle


