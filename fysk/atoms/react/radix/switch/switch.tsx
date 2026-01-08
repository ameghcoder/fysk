"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const switchVariants = cva(
    "peer inline-flex shrink-0 cursor-pointer items-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 relative",
    {
        variants: {
            variant: {
                normal:
                    "rounded-full border-2 border-transparent data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
                square:
                    "rounded-[6px] border-2 border-transparent data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
                line: "bg-transparent after:absolute after:inset-x-0 after:top-1/2 after:h-1 after:-translate-y-1/2 after:rounded-full after:bg-input data-[state=checked]:after:bg-primary after:transition-colors after:duration-150 after:shadow-inner",
            },
            size: {
                sm: "",
                md: "",
                lg: "",
            },
        },
        compoundVariants: [
            // Normal & Square sizes
            {
                variant: ["normal", "square"],
                size: "sm",
                className: "h-4 w-7",
            },
            {
                variant: ["normal", "square"],
                size: "md",
                className: "h-6 w-11",
            },
            {
                variant: ["normal", "square"],
                size: "lg",
                className: "h-8 w-14",
            },
            // Line sizes
            {
                variant: "line",
                size: "sm",
                className: "h-4 w-8",
            },
            {
                variant: "line",
                size: "md",
                className: "h-6 w-12",
            },
            {
                variant: "line",
                size: "lg",
                className: "h-8 w-16",
            },
        ],
        defaultVariants: {
            variant: "normal",
            size: "md",
        },
    }
)

const thumbVariants = cva(
    "pointer-events-none block bg-background shadow ring-0 transition-all duration-150",
    {
        variants: {
            variant: {
                normal: "rounded-full",
                square: "rounded-[4px]",
                line: "rounded-lg bg-background z-10 border border-border/50 data-[state=checked]:border-primary/50 shadow-sm",
            },
            size: {
                sm: "",
                md: "",
                lg: "",
            },
        },
        compoundVariants: [
            // Normal & Square thumb sizes
            {
                variant: ["normal", "square"],
                size: "sm",
                className: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
            },
            {
                variant: ["normal", "square"],
                size: "md",
                className: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
            },
            {
                variant: ["normal", "square"],
                size: "lg",
                className: "h-7 w-7 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
            },
            // Line thumb sizes
            {
                variant: "line",
                size: "sm",
                className: "h-4 w-1.5 data-[state=checked]:translate-x-[26px] data-[state=unchecked]:translate-x-0",
            },
            {
                variant: "line",
                size: "md",
                className: "h-6 w-2 data-[state=checked]:translate-x-10 data-[state=unchecked]:translate-x-0",
            },
            {
                variant: "line",
                size: "lg",
                className: "h-8 w-2.5 data-[state=checked]:translate-x-[54px] data-[state=unchecked]:translate-x-0",
            },
        ],
        defaultVariants: {
            variant: "normal",
            size: "md",
        },
    }
)


export interface SwitchProps
    extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> { }

const Switch = React.forwardRef<
    React.ComponentRef<typeof SwitchPrimitive.Root>,
    SwitchProps
>(({ className, variant, size, ...props }, ref) => (
    <SwitchPrimitive.Root
        className={cn(switchVariants({ variant, size, className }))}
        {...props}
        ref={ref}
    >
        <SwitchPrimitive.Thumb className={cn(thumbVariants({ variant, size }))} />
    </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }

