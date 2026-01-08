"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useFyskConfig, type FyskIconPosition } from "@/components/fysk-provider"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                primary: "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] shadow-sm",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
                outline: "border border-border/50 bg-transparent hover:bg-muted text-foreground active:scale-[0.98]",
                ghost: "hover:bg-muted hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                sm: "h-8 px-3 text-xs",
                md: "h-10 px-4",
                lg: "h-12 px-8 text-base",
                xl: "h-14 px-10 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
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
            return icon // If idle, use the provided idle icon
        }

        const renderText = () => {
            if (isLoading) return loadingText || children
            if (isSuccess) return successText || children
            if (isError) return errorText || children
            return children
        }

        const activeIcon = renderIcon()
        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, className }),
                    activeIconPosition === "end" && "flex-row-reverse",
                    isSuccess && "border-[#22c55e]/50",
                    isError && "border-destructive/50"
                )}
                ref={ref}
                disabled={isLoading || props.disabled}
                data-state={state}
                {...props}
            >
                {asChild ? children :
                    <>
                        {activeIcon && <span className="inline-flex shrink-0">{activeIcon}</span>}
                        {renderText()}
                    </>
                }
            </Comp>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

