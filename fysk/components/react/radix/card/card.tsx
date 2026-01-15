"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { useFyskConfig } from "@/components/fysk-provider"
import { cn } from "@/lib/utils"

const cardVariants = cva(
    "relative overflow-hidden rounded-xl transition-all duration-150",
    {
        variants: {
            variant: {
                default: "border border-border/50 bg-card text-card-foreground shadow",
                outline: "border-2 border-border bg-transparent",
                ghost: "bg-transparent shadow-none border-none",
                glass: "bg-foreground/5 backdrop-blur-md border border-border/50 text-card-foreground shadow",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

import { useFyskAnimation } from "@/components/hooks/useFyskAnimation"

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
    state?: "idle" | "loading" | "success" | "error"
    LoaderIcon?: React.ReactNode
    SuccessIcon?: React.ReactNode
    ErrorIcon?: React.ReactNode
    hoverEffect?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({
    className,
    variant,
    state = "idle",
    children,
    LoaderIcon,
    SuccessIcon,
    ErrorIcon,
    hoverEffect = true,
    ...props
}, ref) => {
    const config = useFyskConfig();
    const { isEnabled, motion, AnimatePresence, transitions, variants, durations } = useFyskAnimation()

    const finalLoadingIcon = LoaderIcon || config.icons?.loading;
    const finalSuccessIcon = SuccessIcon || config.icons?.success;
    const finalErrorIcon = ErrorIcon || config.icons?.error;

    const isLoading = state === "loading"
    const isSuccess = state === "success"
    const isError = state === "error"

    return <motion.div
        ref={ref}
        {...(isEnabled ? {
            layout: true
        } : {})}
        className={cn(
            cardVariants({ variant, className }),
            isSuccess && "border-green-500/50",
            isError && "border-destructive/50"
        )}
        data-state={state}
        {...props}
    >
        {/* Loading Overlay */}
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    {...(isEnabled && variants ? variants.overlay : {})}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-card/80 backdrop-blur-[2px]"
                >
                    {finalLoadingIcon && <motion.span
                        {...(isEnabled ? {
                            animate: { rotate: 360 },
                            transition: { repeat: Infinity, duration: durations.slow, ease: "linear" }
                        } : { className: "[&_svg]:animate-spin" })}
                        className="h-8 w-8 text-primary [&_svg]:size-full"
                    >
                        {finalLoadingIcon}
                    </motion.span>}
                </motion.div>
            )}
        </AnimatePresence>

        {/* Success/Error Indicator (Bottom Pill) */}
        <AnimatePresence>
            {(isSuccess || isError) && (
                <motion.div
                    {...(isEnabled && variants ? {
                        ...variants.slideUp,
                        style: { x: "-50%" }
                    } : {
                        className: "absolute bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300"
                    })}
                    className={cn(
                        "absolute bottom-3 left-1/2 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg",
                        isSuccess && "bg-green-500/10 text-green-600 border border-green-500/30",
                        isError && "bg-destructive/10 text-destructive border border-destructive/30"
                    )}
                >
                    <span className="size-4 [&_svg]:size-full">
                        {isSuccess && finalSuccessIcon}
                        {isError && finalErrorIcon}
                    </span>
                    <span>{isSuccess ? "Success" : "Error"}</span>
                </motion.div>
            )}
        </AnimatePresence>
        {children}
    </motion.div>
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
