"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

// --- Types & Context ---

type TabsVariant = "default" | "glass" | "underline" | "pill"

type TabsContextValue = {
    variant: TabsVariant
    fullWidth?: boolean
}

const TabsContext = React.createContext<TabsContextValue>({
    variant: "default",
})

const useTabsContext = () => React.useContext(TabsContext)

// --- Components ---

const Tabs = React.forwardRef<
    React.ComponentRef<typeof TabsPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
        variant?: TabsVariant
        fullWidth?: boolean
    }
>(({ className, variant = "default", fullWidth = false, ...props }, ref) => (
    <TabsContext.Provider value={{ variant, fullWidth }}>
        <TabsPrimitive.Root
            ref={ref}
            className={cn("w-full", className)}
            {...props}
        />
    </TabsContext.Provider>
))
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = React.forwardRef<
    React.ComponentRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
    const { variant, fullWidth } = useTabsContext()

    return (
        <TabsPrimitive.List
            ref={ref}
            className={cn(
                "inline-flex list-none items-center justify-center",
                // Default
                variant === "default" &&
                "h-10 rounded-md bg-muted/50 overflow-hidden text-muted-foreground border border-border/50",
                // Glass
                variant === "glass" &&
                "h-12 gap-2 rounded-full border border-border/50 bg-background/25 p-2 backdrop-blur-xl",
                // Underline
                variant === "underline" &&
                "h-auto w-full justify-start rounded-none border-b border-border bg-transparent p-0",
                // Pill
                variant === "pill" && "h-auto gap-2 bg-transparent p-0",
                // Full Width Override
                fullWidth && "w-full",
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
    const { variant, fullWidth } = useTabsContext()

    return (
        <TabsPrimitive.Trigger
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                // Default
                variant === "default" &&
                "rounded-sm h-10 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                // Glass
                variant === "glass" &&
                "rounded-full px-4 py-2 hover:bg-glass-bg/10 data-[state=active]:bg-glass-bg/30 data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:backdrop-blur-md",
                // Underline
                variant === "underline" &&
                "relative rounded-none border-b-2 border-transparent bg-transparent pb-3 pt-2 shadow-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none",
                // Pill
                variant === "pill" &&
                "rounded-full border border-transparent bg-muted px-4 py-2 hover:bg-muted/80 data-[state=active]:border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                // Full Width Override
                fullWidth && "flex-1",
                className
            )}
            {...props}
        />
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
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
