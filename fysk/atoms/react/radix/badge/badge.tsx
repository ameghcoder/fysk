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
                success:
                    "border-transparent bg-[#22c55e] text-[#f9fcfa] hover:opacity-80",
                error:
                    "border-transparent bg-destructive text-destructive-foreground hover:opacity-80",
                warning:
                    "border-transparent bg-[#f59f08] text-[#322801] hover:opacity-80",
                info:
                    "border-transparent bg-[#0fa2e7] text-[#e6f7ff] hover:opacity-80",
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
                className: "bg-[#22c55e]/15 border-[#22c55e]/30 text-[#22c55e] hover:bg-[#22c55e]/25 opacity-100",
            },
            {
                variant: "error",
                badgeStyle: "modern",
                className: "bg-destructive/15 border-destructive/30 text-destructive hover:bg-destructive/25 opacity-100",
            },
            {
                variant: "warning",
                badgeStyle: "modern",
                className: "bg-[#f59f08]/15 border-[#f59f08]/30 text-[#f59f08] hover:bg-[#f59f08]/25 opacity-100",
            },
            {
                variant: "info",
                badgeStyle: "modern",
                className: "bg-[#0fa2e7]/15 border-[#0fa2e7]/30 text-[#0fa2e7] hover:bg-[#0fa2e7]/25 opacity-100",
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
        <div
            className={cn(
                badgeVariants({ variant, size, badgeStyle }),
                activeIconPosition === "end" && "flex-row-reverse",
                className
            )}
            {...props}
        >
            {currentIcon && <span className="inline-flex shrink-0">{currentIcon}</span>}
            {!currentIcon && dot && (
                <span
                    className={cn(
                        "h-1.5 w-1.5 rounded-full bg-current shrink-0",
                        dotBlink && "animate-blink"
                    )}
                />
            )}
            {children}
        </div>
    )
}


export { Badge, badgeVariants }
