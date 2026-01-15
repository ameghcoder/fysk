"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useFyskConfig, type FyskIconPosition } from "@/components/fysk-provider"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-semibold whitespace-nowrap gap-1.5",
    {
        variants: {
            variant: {
                primary:
                    "border-transparent bg-primary text-primary-foreground hover:opacity-80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                outline: "text-foreground border-border",
                ghost: "text-foreground border-transparent bg-transparent hover:bg-muted/50",
                glass: "bg-foreground/10 backdrop-blur-md border-border/50 text-foreground shadow-sm",
                success:
                    "border-transparent bg-green-500 text-white hover:opacity-80",
                error:
                    "border-transparent bg-destructive text-destructive-foreground hover:opacity-80",
                warning:
                    "border-transparent bg-amber-500 text-amber-950 hover:opacity-80",
                info:
                    "border-transparent bg-sky-500 text-sky-50 hover:opacity-80",
            },
            size: {
                sm: "px-2 py-0 text-[10px]",
                md: "px-2.5 py-0.5 text-xs",
                lg: "px-3 py-1 text-sm",
            },
            badgeStyle: {
                native: "",
                modern: "",
            }
        },
        compoundVariants: [
            {
                variant: "success",
                badgeStyle: "modern",
                className: "bg-green-500/15 border-green-500/30 text-green-500 hover:bg-green-500/25 opacity-100",
            },
            {
                variant: "error",
                badgeStyle: "modern",
                className: "bg-destructive/15 border-destructive/30 text-destructive hover:bg-destructive/25 opacity-100",
            },
            {
                variant: "warning",
                badgeStyle: "modern",
                className: "bg-amber-500/15 border-amber-500/30 text-amber-500 hover:bg-amber-500/25 opacity-100",
            },
            {
                variant: "info",
                badgeStyle: "modern",
                className: "bg-sky-500/15 border-sky-500/30 text-sky-500 hover:bg-sky-500/25 opacity-100",
            },
            {
                variant: "primary",
                badgeStyle: "modern",
                className: "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 opacity-100",
            },
        ],
        defaultVariants: {
            variant: "primary",
            size: "md",
            badgeStyle: "native",
        },
    }
)

import { useFyskAnimation } from "@/components/hooks/useFyskAnimation"

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    dot?: boolean
    dotBlink?: boolean
    state?: "idle" | "loading" | "success" | "error"
    icon?: React.ReactNode
    iconLoading?: React.ReactNode
    iconSuccess?: React.ReactNode
    iconError?: React.ReactNode
    iconPosition?: FyskIconPosition
}

function Badge({
    className,
    variant,
    size,
    badgeStyle,
    dot = false,
    dotBlink = true,
    state = "idle",
    icon,
    iconLoading: propIconLoading,
    iconSuccess: propIconSuccess,
    iconError: propIconError,
    iconPosition: propIconPosition,
    children,
    ...props
}: BadgeProps) {
    const config = useFyskConfig()
    const { isEnabled, motion, AnimatePresence, transitions, variants } = useFyskAnimation()

    const isLoading = state === "loading"
    const isSuccess = state === "success"
    const isError = state === "error"

    const activeIconPosition = propIconPosition || config.iconPosition || "start"
    const finalIconLoading = propIconLoading || config.icons?.loading
    const finalIconSuccess = propIconSuccess || config.icons?.success
    const finalIconError = propIconError || config.icons?.error

    const activeIcon = () => {
        if (isLoading) return finalIconLoading
        if (isSuccess) return finalIconSuccess
        if (isError) return finalIconError
        return icon
    }

    const currentIcon = activeIcon()

    return (
        <motion.div
            {...(isEnabled ? {
                layout: true,
                transition: transitions?.layout
            } : {})}
            className={cn(
                badgeVariants({ variant, size, badgeStyle }),
                activeIconPosition === "end" && "flex-row-reverse",
                className
            )}
            {...props}
        >
            <AnimatePresence {...(isEnabled ? { mode: "wait", initial: false } : {})}>
                <motion.div
                    key={state + (currentIcon ? "icon" : "dot")}
                    {...(isEnabled && variants ? {
                        ...variants.scaleIn,
                    } : {})}
                    className="flex items-center gap-1.5"
                >
                    {currentIcon ? (
                        <span className={cn(
                            "inline-flex shrink-0",
                            size === "sm" && "[&_svg]:size-3",
                            (size === "md" || !size) && "[&_svg]:size-3.5",
                            size === "lg" && "[&_svg]:size-4",
                        )}>
                            {currentIcon}
                        </span>
                    ) : dot ? (
                        <span
                            className={cn(
                                "h-1.5 w-1.5 rounded-full bg-current shrink-0",
                                dotBlink && (isEnabled ? "animate-pulse" : "animate-blink")
                            )}
                        />
                    ) : null}
                </motion.div>
            </AnimatePresence>
            {children}
        </motion.div>
    )
}


export { Badge, badgeVariants }

