"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

import { useFyskAnimation } from "@/components/hooks/useFyskAnimation"

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
                glass: "rounded-full border border-border/50 data-[state=checked]:bg-primary/20 backdrop-blur-md data-[state=unchecked]:bg-foreground/10",
            },
            size: {
                sm: "",
                md: "",
                lg: "",
            },
        },
        compoundVariants: [
            // Normal, Square & Glass sizes
            {
                variant: ["normal", "square", "glass"],
                size: "sm",
                className: "h-4 w-7",
            },
            {
                variant: ["normal", "square", "glass"],
                size: "md",
                className: "h-6 w-11",
            },
            {
                variant: ["normal", "square", "glass"],
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
    "pointer-events-none block bg-background shadow ring-0 transition-all duration-150 flex items-center justify-center overflow-hidden",
    {
        variants: {
            variant: {
                normal: "rounded-full",
                square: "rounded-[4px]",
                line: "rounded-lg bg-background z-10 border border-border/50 data-[state=checked]:border-primary/50 shadow-sm",
                glass: "rounded-full bg-background/80 backdrop-blur-sm",
            },
            size: {
                sm: "h-3 w-3",
                md: "h-5 w-5",
                lg: "h-7 w-7",
            },
        },
        compoundVariants: [
            // Normal, Square & Glass thumb sizes
            {
                variant: ["normal", "square", "glass"],
                size: "sm",
                className: "data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
            },
            {
                variant: ["normal", "square", "glass"],
                size: "md",
                className: "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
            },
            {
                variant: ["normal", "square", "glass"],
                size: "lg",
                className: "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
            },
            // Line thumb sizes
            {
                variant: "line",
                size: "sm",
                className: "w-1.5 data-[state=checked]:translate-x-[26px] data-[state=unchecked]:translate-x-0",
            },
            {
                variant: "line",
                size: "md",
                className: "w-2 data-[state=checked]:translate-x-10 data-[state=unchecked]:translate-x-0",
            },
            {
                variant: "line",
                size: "lg",
                className: "w-2.5 data-[state=checked]:translate-x-[54px] data-[state=unchecked]:translate-x-0",
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
    VariantProps<typeof switchVariants> {
    state?: "idle" | "loading" | "success" | "error"
}

const Switch = React.forwardRef<
    React.ComponentRef<typeof SwitchPrimitive.Root>,
    SwitchProps
>(({ className, variant, size, state = "idle", ...props }, ref) => {
    const isLoading = state === "loading"
    const isSuccess = state === "success"
    const isError = state === "error"

    const { isEnabled, motion, AnimatePresence, transitions, variants } = useFyskAnimation()

    return (
        <SwitchPrimitive.Root
            className={cn(
                switchVariants({ variant, size, className }),
                isSuccess && "data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-green-500/20",
                isError && "data-[state=checked]:bg-destructive data-[state=unchecked]:bg-destructive/20",
                isLoading && "opacity-70"
            )}
            {...props}
            disabled={isLoading || props.disabled}
            ref={ref}
        >
            <SwitchPrimitive.Thumb asChild={isEnabled}>
                <motion.div
                    {...(isEnabled ? {
                        layout: true,
                        transition: transitions?.layout
                    } : {})}
                    className={cn(thumbVariants({ variant, size }))}
                >
                    <AnimatePresence {...(isEnabled ? { mode: "wait" } : {})}>
                        {isLoading && (
                            <motion.div
                                key="loading"
                                {...(isEnabled && variants ? variants.scaleIn : {})}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="animate-spin rounded-full border-2 border-primary border-t-transparent w-[60%] h-[60%]" />
                            </motion.div>
                        )}
                        {isSuccess && (
                            <motion.div
                                key="success"
                                {...(isEnabled && variants ? variants.iconPop : {})}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-[70%] h-[70%] text-green-600"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </motion.div>
                        )}
                        {isError && (
                            <motion.div
                                key="error"
                                {...(isEnabled && variants ? variants.scaleIn : {})}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-[70%] h-[70%] text-destructive"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
    )
})
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }


