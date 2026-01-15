"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useFyskConfig, type FyskIconPosition } from "@/components/fysk-provider"
import { useFyskAnimation } from "@/components/hooks/useFyskAnimation"

const buttonVariants = cva(
    "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden border border-transparent",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] shadow-xs",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98] shadow-xs",
                outline: "border-border bg-background text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
                ghost: "hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
                link: "text-primary underline-offset-4 hover:underline",
                destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 active:scale-[0.98]",
                glass: "bg-foreground/10 backdrop-blur-md border-border/50 text-foreground hover:bg-foreground/15 active:scale-[0.98] shadow-xs",
            },
            size: {
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                md: "h-9 px-4 py-2 has-[>svg]:px-3",
                lg: "h-11 px-8 py-3 has-[>svg]:px-4",
                xl: "h-12 px-10 py-4 has-[>svg]:px-5",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    state?: "idle" | "loading" | "success" | "error"
    loadingText?: string
    successText?: string
    errorText?: string
    /** The icon to show when the button is in the 'idle' state. */
    icon?: React.ReactNode
    /** Custom loading icon to override the global default. */
    iconLoading?: React.ReactNode
    /** Custom success icon to override the global default. */
    iconSuccess?: React.ReactNode
    /** Custom error icon to override the global default. */
    iconError?: React.ReactNode
    /** Override the global icon position. */
    iconPosition?: FyskIconPosition
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            state = "idle",
            loadingText,
            successText,
            errorText,
            icon,
            iconLoading: propIconLoading,
            iconSuccess: propIconSuccess,
            iconError: propIconError,
            iconPosition: propIconPosition,
            children,
            ...props
        },
        ref
    ) => {
        const config = useFyskConfig()
        const { isEnabled, motion, AnimatePresence, transitions, variants } = useFyskAnimation()

        const isLoading = state === "loading"
        const isSuccess = state === "success"
        const isError = state === "error"

        // Hierarchical Icon Lookup
        const activeIconPosition = propIconPosition || config.iconPosition || "start"

        const finalIconLoading = propIconLoading || config.icons?.loading
        const finalIconSuccess = propIconSuccess || config.icons?.success
        const finalIconError = propIconError || config.icons?.error

        const renderIcon = () => {
            if (isLoading) return finalIconLoading
            if (isSuccess) return finalIconSuccess
            if (isError) return finalIconError
            return icon
        }

        const renderText = () => {
            if (isLoading) return loadingText || children
            if (isSuccess) return successText || children
            if (isError) return errorText || children
            return children
        }

        const activeIcon = renderIcon()
        const activeText = renderText()
        const Comp = asChild ? Slot : (isEnabled ? motion.button : "button")

        return (
            <Comp
                {...(isEnabled && !asChild ? {
                    layout: true,
                    transition: transitions?.layoutEnter
                } : {})}
                className={cn(
                    buttonVariants({ variant, size, className })
                )}
                ref={ref}
                disabled={isLoading || props.disabled}
                data-state={state}
                {...props}
            >
                {asChild ? children : (
                    <AnimatePresence {...(isEnabled ? { mode: "wait", initial: false } : {})}>
                        <motion.span
                            key={state}
                            {...(isEnabled && variants ? {
                                layout: true,
                                ...variants.fadeSlide,
                                transition: transitions?.content
                            } : {})}
                            className={`inline-flex items-center justify-center gap-2 ${activeIconPosition === "end" && "flex-row-reverse"}`}
                        >
                            {activeIcon && (
                                <motion.span
                                    {...(isEnabled && variants ? {
                                        layout: true,
                                        ...variants.iconPop
                                    } : {})}
                                    className="inline-flex shrink-0"
                                >
                                    {activeIcon}
                                </motion.span>
                            )}
                            {activeText}
                        </motion.span>
                    </AnimatePresence>
                )}
            </Comp>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }


