"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

// --- Types & Context ---

import { useFyskAnimation } from "@/components/hooks/useFyskAnimation"

type TabsVariant = "default" | "glass" | "underline" | "pill"
type TabsState = "idle" | "loading" | "success" | "error"

type TabsContextValue = {
    variant: TabsVariant
    fullWidth?: boolean
    state: TabsState
    value?: string
    id: string
}

const TabsContext = React.createContext<TabsContextValue>({
    variant: "default",
    state: "idle",
    id: "tabs"
})

const useTabsContext = () => React.useContext(TabsContext)

// --- Components ---

const Tabs = React.forwardRef<
    React.ComponentRef<typeof TabsPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
        variant?: TabsVariant
        fullWidth?: boolean
        state?: TabsState
    }
>(({ className, variant = "default", fullWidth = false, state = "idle", value: propsValue, defaultValue, onValueChange, ...props }, ref) => {
    const [value, setValue] = React.useState(propsValue || defaultValue)
    const id = React.useId()

    React.useEffect(() => {
        if (propsValue !== undefined) setValue(propsValue)
    }, [propsValue])

    const handleValueChange = (val: string) => {
        if (propsValue === undefined) setValue(val)
        onValueChange?.(val)
    }

    return (
        <TabsContext.Provider value={{ variant, fullWidth, state, value, id }}>
            <TabsPrimitive.Root
                ref={ref}
                value={value}
                onValueChange={handleValueChange}
                className={cn("w-full", className)}
                {...props}
            />
        </TabsContext.Provider>
    )
})
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = React.forwardRef<
    React.ComponentRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
    const { variant, fullWidth, state } = useTabsContext()

    const isLoading = state === "loading"
    const isSuccess = state === "success"
    const isError = state === "error"

    return (
        <TabsPrimitive.List
            ref={ref}
            className={cn(
                "inline-flex list-none items-center justify-center transition-all duration-300",
                // Default
                variant === "default" &&
                "h-10 rounded-md bg-muted/50 overflow-hidden text-muted-foreground border border-border/50 p-1",
                // Glass
                variant === "glass" &&
                "h-12 gap-2 rounded-full border border-border/50 bg-background/25 p-2 backdrop-blur-xl",
                // Underline
                variant === "underline" &&
                "h-auto w-full justify-start rounded-none border-b border-border bg-transparent p-0",
                // Pill
                variant === "pill" && "h-auto gap-2 bg-transparent p-0 rounded-full",
                // Full Width Override
                fullWidth && "w-full",
                // States
                isSuccess && "border-green-500/50 shadow-[0_0_15px_-3px_rgba(34,197,94,0.2)]",
                isError && "border-destructive/50 shadow-[0_0_15px_-3px_rgba(239,68,68,0.2)]",
                isLoading && "opacity-70",
                className
            )}
            {...props}
        />
    )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
    React.ComponentRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
    const { variant, fullWidth, state, value, id } = useTabsContext()
    const { isEnabled, motion, transitions } = useFyskAnimation()
    const isLoading = state === "loading"
    const isActive = value === props.value

    return (
        <TabsPrimitive.Trigger
            ref={ref}
            disabled={isLoading || props.disabled}
            className={cn(
                "relative inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                // Text color
                isActive ? (variant === "pill" ? "text-primary-foreground" : "text-foreground") : "text-muted-foreground",
                // Base static styles (only applied if animations are disabled or for the static base)
                !isEnabled && [
                    variant === "default" && "rounded-sm data-[state=active]:bg-background data-[state=active]:shadow-sm",
                    variant === "glass" && "rounded-full px-4 py-2 hover:bg-foreground/10 data-[state=active]:bg-foreground/20 data-[state=active]:font-semibold data-[state=active]:backdrop-blur-md",
                    variant === "underline" && "rounded-none border-b-2 border-transparent bg-transparent pb-3 pt-2 data-[state=active]:border-primary data-[state=active]:text-primary",
                    variant === "pill" && "rounded-full border border-transparent bg-muted px-4 py-2 hover:bg-muted/80 data-[state=active]:border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                ],
                // When enabled, we use motion.div for the actual background/indicator
                isEnabled && [
                    variant === "default" && "rounded-sm",
                    variant === "glass" && "rounded-full px-4 py-2 hover:bg-foreground/10",
                    variant === "underline" && "rounded-none bg-transparent pb-3 pt-2",
                    variant === "pill" && "rounded-full border border-transparent px-4 py-2 hover:bg-muted/80",
                ],
                fullWidth && "flex-1",
                className
            )}
            {...props}
        >
            {isEnabled && isActive && (
                <motion.div
                    layoutId={`${id}-active-tab-indicator`}
                    className={cn(
                        "absolute inset-0 z-0",
                        variant === "default" && "bg-background rounded-sm shadow-sm",
                        variant === "glass" && "bg-foreground/20 rounded-full backdrop-blur-md",
                        variant === "underline" && "border-b-2 border-primary inset-x-0 bottom-0 top-auto",
                        variant === "pill" && "bg-primary rounded-full"
                    )}
                    transition={transitions?.layout}
                />
            )}
            <span className="relative z-10 flex items-center justify-center">
                {isLoading && variant === "pill" && isActive ? (
                    <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {props.children}
            </span>
        </TabsPrimitive.Trigger>
    )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
    React.ComponentRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
        )}
        {...props}
    />
))
export { Tabs, TabsList, TabsTrigger, TabsContent }

