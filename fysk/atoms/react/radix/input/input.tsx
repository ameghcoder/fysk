"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useFyskConfig, type FyskIconPosition } from "@/components/fysk-provider"

const inputVariants = cva(
    "flex h-10 w-full rounded-md px-3 py-2 text-base transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "border border-border/50 bg-background",
                filled: "border-transparent bg-muted focus:bg-background border-border/50",
                double: "border-2 border-border bg-transparent focus:border-border focus-visible:ring-2 focus-visible:ring-ring/30",
                ghost: "border-transparent bg-transparent hover:bg-muted focus:bg-background border-border",
                deep: "border border-border/50 bg-muted/20 shadow-[inset_0px_-1px_2px_0px_#00000052] focus:bg-background",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
    state?: "idle" | "loading" | "success" | "error"
    icon?: React.ReactNode
    iconLoading?: React.ReactNode
    iconSuccess?: React.ReactNode
    iconError?: React.ReactNode
    iconPosition?: FyskIconPosition
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            variant,
            type,
            state = "idle",
            icon,
            iconLoading: propIconLoading,
            iconSuccess: propIconSuccess,
            iconError: propIconError,
            iconPosition: propIconPosition,
            ...props
        },
        ref
    ) => {
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

        if (!currentIcon) {
            return (
                <input
                    type={type}
                    className={cn(inputVariants({ variant, className }))}
                    ref={ref}
                    {...props}
                />
            )
        }

        return (
            <div className="relative flex items-center w-full">
                {activeIconPosition === "start" && (
                    <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground [&_svg]:size-4">
                        {currentIcon}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        inputVariants({ variant, className }),
                        currentIcon && activeIconPosition === "start" && "pl-10",
                        currentIcon && activeIconPosition === "end" && "pr-10"
                    )}
                    ref={ref}
                    {...props}
                />
                {activeIconPosition === "end" && (
                    <div className="absolute right-3 flex items-center pointer-events-none text-muted-foreground [&_svg]:size-4">
                        {currentIcon}
                    </div>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input, inputVariants }
