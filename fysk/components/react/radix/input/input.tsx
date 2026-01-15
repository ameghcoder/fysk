"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useFyskConfig, type FyskIconPosition } from "@/components/fysk-provider"

const inputVariants = cva(
    "flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: "border border-input bg-transparent dark:bg-input/30",
                filled: "border border-transparent bg-muted focus:bg-background focus:border-input",
                double: "border-2 border-border bg-transparent focus:border-ring/50",
                ghost: "border border-transparent bg-transparent hover:bg-muted focus:bg-background",
                deep: "border border-border/50 bg-muted/20 shadow-[inset_0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:bg-background",
                glass: "bg-foreground/5 backdrop-blur-md border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:bg-foreground/10",
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
    /** The icon to display at the start or end. */
    icon?: React.ReactNode
    /** Custom loading icon to override the global default. */
    iconLoading?: React.ReactNode
    /** Custom success icon to override the global default. */
    iconSuccess?: React.ReactNode
    /** Custom error icon to override the global default. */
    iconError?: React.ReactNode
    /** Override the global icon position. */
    iconPosition?: FyskIconPosition
    /** Callback when the icon is clicked. If provided, the icon wrapper will be a button. */
    onIconClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

import { useFyskAnimation } from "@/components/hooks/useFyskAnimation"

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
            onIconClick,
            ...props
        },
        ref
    ) => {
        const config = useFyskConfig()
        const { isEnabled, motion, AnimatePresence, variants } = useFyskAnimation()

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

        const renderIcon = () => {
            if (!currentIcon && state === "idle") return null

            const commonClasses = cn(
                "absolute flex items-center justify-center text-muted-foreground [&_svg]:size-4",
                activeIconPosition === "start" ? "left-3" : "right-3"
            )

            return (
                <AnimatePresence mode="wait">
                    {currentIcon && (
                        <motion.div
                            key={state + (currentIcon ? "has-icon" : "no-icon")}
                            {...(isEnabled && variants ? variants.iconPop : {})}
                            className={commonClasses}
                        >
                            {onIconClick ? (
                                <button
                                    type="button"
                                    onClick={onIconClick}
                                    className="pointer-events-auto cursor-pointer hover:text-foreground transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm active:scale-90"
                                >
                                    {currentIcon}
                                </button>
                            ) : (
                                <div className="pointer-events-none">
                                    {currentIcon}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            )
        }

        return (
            <div className="relative flex items-center w-full">
                {activeIconPosition === "start" && renderIcon()}
                <input
                    type={type}
                    className={cn(
                        inputVariants({ variant, className }),
                        currentIcon && activeIconPosition === "start" && "pl-10",
                        currentIcon && activeIconPosition === "end" && "pr-10",
                        isSuccess && "border-green-500/50",
                        isError && "border-destructive/50"
                    )}
                    ref={ref}
                    {...props}
                />
                {activeIconPosition === "end" && renderIcon()}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input, inputVariants }

