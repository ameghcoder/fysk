"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Kbd } from "@/components/fysk/kbd"

// --- Context ---
interface TooltipContextValue {
    variant?: "default" | "outline" | "glass" | "glow" | "neon"
    size?: "sm" | "md" | "lg"
}

const TooltipContext = React.createContext<TooltipContextValue>({})

const Tooltip = ({
    children,
    variant,
    size,
    delayDuration,
    skipDelayDuration,
    disableHoverableContent,
    ...props
}: TooltipPrimitive.TooltipProviderProps &
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> &
    TooltipContextValue) => (
    <TooltipPrimitive.Provider
        delayDuration={delayDuration}
        skipDelayDuration={skipDelayDuration}
        disableHoverableContent={disableHoverableContent}
    >
        <TooltipPrimitive.Root {...props}>
            <TooltipContext.Provider value={{ variant, size }}>
                {children}
            </TooltipContext.Provider>
        </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
)
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipPortal = TooltipPrimitive.Portal

const tooltipVariants = cva(
    "z-50 overflow-hidden rounded-md border px-3 py-1.5 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 selection:bg-primary selection:text-primary-foreground",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground border-primary",
                outline: "bg-background border-border text-foreground",
                glass: "bg-background/60 backdrop-blur-md border-border/50 text-foreground shadow-lg supports-[backdrop-filter]:bg-background/60",
                glow: "bg-background/90 border-primary/50 text-foreground shadow-[0_0_20px_rgba(var(--primary),0.2)]",
                neon: "bg-foreground/95 border-primary text-background shadow-[0_0_10px_rgba(var(--primary),0.5)]",
            },
            size: {
                sm: "px-2 py-1 text-[10px]",
                md: "px-3 py-1.5 text-xs",
                lg: "px-4 py-2 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
)

export interface TooltipContentProps
    extends Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, "title">,
    VariantProps<typeof tooltipVariants> {
    /**
     * Keyboard shortcut to display (e.g. "⌘+C" or ["Cmd", "C"])
     */
    shortcut?: string | string[]
    /**
     * Title text for rich tooltips
     */
    title?: React.ReactNode
    /**
     * Description text for rich tooltips
     */
    description?: React.ReactNode
    /**
     * Whether to show the arrow
     */
    showArrow?: boolean
    /**
     * Alias for side
     */
    side?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["side"]
}

const TooltipContent = React.forwardRef<
    React.ComponentRef<typeof TooltipPrimitive.Content>,
    TooltipContentProps
>(({ className, variant: propsVariant, size: propsSize, sideOffset = 4, shortcut, title, description, showArrow, side: propsSide, children, ...props }, ref) => {
    const context = React.useContext(TooltipContext)

    // Resolve variant and size from props or context
    const variant = propsVariant || context.variant || "default"
    const size = propsSize || context.size || "md"

    // Resolve aliases
    const shouldShowArrow = showArrow
    const resolvedSide = propsSide || "top"

    // Parse shortcut
    const shortcutKeys = React.useMemo(() => {
        if (!shortcut) return undefined
        if (Array.isArray(shortcut)) return shortcut
        return shortcut.split('+').map(k => k.trim())
    }, [shortcut])

    const getKbdClassName = () => {
        if (variant === "default") return "bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground"
        if (variant === "neon") return "border-background/30 text-background bg-background/20"
        return ""
    }

    return (
        <TooltipPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            side={resolvedSide}
            className={cn(tooltipVariants({ variant, size }), className)}
            {...props}
        >
            <div className="flex flex-col gap-0.5 max-w-[300px]">
                {/* Header Row: Title & Shortcut (or Children & Shortcut if simple) */}
                <div className={cn("flex items-center justify-between gap-4", (title || description) && "mb-0.5")}>
                    {title && <span className="font-bold tracking-tight">{title}</span>}

                    {/* If no title, children are the main content in this row unless description exists */}
                    {!title && !description && children}

                    {shortcutKeys && (
                        <Kbd
                            keys={shortcutKeys}
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "ml-auto h-5 min-h-0 py-0 text-[10px]",
                                getKbdClassName()
                            )}
                        />
                    )}
                </div>

                {/* Description */}
                {description && (
                    <p className={cn(
                        "font-normal leading-snug",
                        variant === "default" || variant === "neon" ? "opacity-80" : "text-muted-foreground"
                    )}>
                        {description}
                    </p>
                )}

                {/* Children (if Title or Desc present, render children below) */}
                {(title || description) && children && (
                    <div className="mt-1.5 pt-1.5 border-t border-glass-border/10 opacity-90">
                        {children}
                    </div>
                )}
            </div>

            {shouldShowArrow && (
                <TooltipPrimitive.Arrow
                    className={cn(
                        "fill-current",
                        variant === "default" && "text-primary",
                        variant === "outline" && "text-background stroke-border",
                        variant === "glass" && "text-background/60 stroke-border/50",
                        variant === "neon" && "text-foreground",
                        variant === "glow" && "text-background/90"
                    )}
                />
            )}
        </TooltipPrimitive.Content>
    )
})
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipPortal }

