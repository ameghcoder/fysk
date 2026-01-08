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
                secondary: "bg-secondary text-secondary-foreground",
                ghost: "bg-transparent shadow-none",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
    state?: "idle" | "loading"
    LoaderIcon?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, variant, state = "idle", children, LoaderIcon, ...props }, ref) => {
    const config = useFyskConfig();

    const finalLoadingIcon = LoaderIcon || config.icons?.loading;
    return <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
    >
        {state === "loading" && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-card backdrop-blur-[1px]">
                {
                    finalLoadingIcon && <span className="h-8 w-8 [&_svg]:animate-spin text-primary">{finalLoadingIcon}</span>
                }
            </div>
        )}
        {children}
    </div>
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
