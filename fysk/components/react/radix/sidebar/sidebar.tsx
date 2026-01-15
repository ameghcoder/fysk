"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { useFyskConfig } from "@/components/fysk-provider"

// --- Configuration ---
const SIDEBAR_WIDTH = "260px"
const SIDEBAR_WIDTH_COLLAPSED = "64px"

// --- Types ---
type SidebarStyleMode = "fixed" | "sticky" | "floating" | "inset"
type SidebarCollapsibleMode = "icon" | "none" // "icon" = collapses to icons, "none" = always expanded

interface SidebarContextValue {
    isOpen: boolean
    toggle: () => void
    styleMode: SidebarStyleMode
    collapsible: SidebarCollapsibleMode
    isMobile: boolean
    setOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function useSidebar() {
    const context = React.useContext(SidebarContext)
    if (!context) throw new Error("useSidebar must be used within SidebarProvider")
    return context
}

// --- 1. Provider ---
// --- 1. Provider ---
export function SidebarProvider(props: {
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    defaultOpen?: boolean
    styleMode?: SidebarStyleMode
    collapsible?: SidebarCollapsibleMode
    className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
    const {
        children,
        open: openProp,
        onOpenChange,
        defaultOpen = true,
        styleMode = "fixed",
        collapsible = "icon",
        className,
        ...remainingProps
    } = props

    const [isOpenInternal, setIsOpenInternal] = React.useState(defaultOpen)
    const [isMobile, setIsMobile] = React.useState(false)

    const isOpen = openProp !== undefined ? openProp : isOpenInternal

    const setOpen = React.useCallback((value: boolean | ((prev: boolean) => boolean)) => {
        const openState = openProp !== undefined ? openProp : isOpenInternal
        const nextValue = typeof value === 'function' ? value(openState) : value

        if (openProp === undefined) {
            setIsOpenInternal(nextValue)
        }
        if (nextValue !== openState) {
            onOpenChange?.(nextValue)
        }
    }, [openProp, isOpenInternal, onOpenChange])

    React.useEffect(() => {
        const checkMobile = () => {
            const isSmall = window.innerWidth < 768
            setIsMobile(isSmall)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const toggle = React.useCallback(() => {
        if (!isMobile && collapsible === "none") return;
        setOpen((prev) => !prev)
    }, [collapsible, isMobile, setOpen])

    return (
        <SidebarContext.Provider value={{ isOpen, setOpen, toggle, styleMode, collapsible, isMobile }}>
            <div
                className={cn(
                    "flex w-full bg-background transition-colors",
                    (styleMode === "fixed" || styleMode === "sticky") ? "min-h-screen" : "min-h-full",
                    className
                )}
                data-style-mode={styleMode}
                data-collapsible={collapsible}
                {...remainingProps}
            >
                {children}
            </div>
        </SidebarContext.Provider>
    )
}

// --- 2. The Main Sidebar ---
const sidebarVariants = cva(
    "group z-30 flex flex-col bg-sidebar border-r border-sidebar-border transition-[width,transform] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
    {
        variants: {
            mode: {
                fixed: "fixed left-0 top-0 h-screen",
                sticky: "sticky top-0 h-screen",
                floating: "fixed left-4 top-4 h-[calc(100vh-2rem)] rounded-2xl border shadow-xl bg-sidebar/80 backdrop-blur-md",
                inset: "relative h-full",
            },
        },
        defaultVariants: {
            mode: "fixed",
        },
    }
)

export const Sidebar = React.forwardRef<
    HTMLElement,
    HTMLMotionProps<"aside"> & {
        children?: React.ReactNode
        styleMode?: SidebarStyleMode
        collapsible?: SidebarCollapsibleMode
    } & VariantProps<typeof sidebarVariants>
>(({ className, children, styleMode: styleModeOverride, collapsible: collapsibleOverride, ...props }, ref) => {
    const { isOpen, styleMode: contextStyleMode, collapsible: contextCollapsible, isMobile, setOpen } = useSidebar()
    const config = useFyskConfig()

    const styleMode = styleModeOverride || contextStyleMode
    const collapsible = collapsibleOverride || contextCollapsible

    // Logic: Mobile always uses full width when open.
    // Otherwise, check isOpen state.
    const shouldBeExpanded = isMobile ? isOpen : (collapsible === "none" ? true : isOpen)
    const width = shouldBeExpanded ? SIDEBAR_WIDTH : (isMobile ? "0px" : SIDEBAR_WIDTH_COLLAPSED)

    return (
        <>
            {/* Spacer - Hidden on Mobile or if sidebar is floating */}
            {styleMode === "fixed" && !isMobile && (
                <div
                    className="shrink-0 transition-[width] duration-300 ease-in-out"
                    style={{ width: width }}
                />
            )}

            <motion.aside
                ref={ref}
                initial={false}
                animate={{
                    width: width,
                    // Mobile: Slide out when closed, otherwise stay at 0
                    x: isMobile && !isOpen ? -parseInt(SIDEBAR_WIDTH) : 0
                }}
                className={cn(
                    sidebarVariants({ mode: styleMode }),
                    "overflow-hidden",
                    className
                )}
                {...props}
            >
                {/* Mobile Close Button */}
                {isMobile && (
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute z-50 right-4 top-4 p-2 rounded-full bg-sidebar-accent md:hidden"
                    >
                        <span className="size-4 flex items-center justify-center [&_svg]:size-full">
                            {config.icons?.close}
                        </span>
                    </button>
                )}

                <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden custom-sidebar-scroll">
                    {children}
                </div>
            </motion.aside>

            {/* Mobile Backdrop Overlay */}
            <AnimatePresence>
                {isMobile && isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-20 bg-background/40 backdrop-blur-sm md:hidden"
                        onClick={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-sidebar-scroll::-webkit-scrollbar { width: 4px; }
                .custom-sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
                .custom-sidebar-scroll::-webkit-scrollbar-thumb { background: transparent; border-radius: 10px; }
                .custom-sidebar-scroll:hover::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); }
                .dark .custom-sidebar-scroll:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
            `}} />
        </>
    )
})
Sidebar.displayName = "Sidebar"

// --- 3. Header, Footer, Content, Groups ---
// (These remain the same as previous step, kept here for completeness if needed)
export const SidebarHeader = ({ className, children }: React.ComponentProps<"div">) => (
    <div className={cn("flex items-center px-4 py-4 h-16 shrink-0 border-b border-sidebar-border/50", className)}>
        {children}
    </div>
)
export const SidebarFooter = ({ className, children }: React.ComponentProps<"div">) => (
    <div className={cn("mt-auto px-4 py-4 border-t border-sidebar-border/50", className)}>
        {children}
    </div>
)
export const SidebarContent = ({ className, children }: React.ComponentProps<"div">) => (
    <div className={cn("flex-1 px-3 py-3 space-y-1", className)}>
        {children}
    </div>
)
export const SidebarGroup = ({ className, children }: React.ComponentProps<"div">) => (
    <div className={cn("relative flex w-full min-w-0 flex-col p-2", className)}>{children}</div>
)
export const SidebarGroupLabel = ({ className, children }: React.ComponentProps<"div">) => {
    const { isOpen, collapsible } = useSidebar()
    const showLabel = collapsible === "none" || isOpen
    return (
        <AnimatePresence>
            {showLabel && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest", className)}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
export const SidebarGroupContent = ({ className, children }: React.ComponentProps<"div">) => (
    <div className={cn("w-full text-sm", className)}>{children}</div>
)

// --- 4. Interactive Items (UPDATED LOGIC) ---
export const SidebarItem = React.forwardRef<
    HTMLDivElement,
    {
        icon?: React.ReactNode
        label: string
        active?: boolean
        asChild?: boolean
        subMenu?: React.ReactNode
        onClick?: () => void
    } & React.ComponentProps<"div">
>(({ icon, label, active, asChild, subMenu, children, onClick, className, ...props }, ref) => {
    const { isOpen, setOpen, collapsible } = useSidebar()
    const config = useFyskConfig()
    const [isSubOpen, setSubOpen] = React.useState(false)

    // Sub-menu logic: 
    // If subMenu prop is provided, it's explicitly a collapsible parent.
    // If asChild is false, children acts as the subMenu (backwards compatibility).
    const hasSubMenu = !!subMenu || (!asChild && !!children)
    const isCollapsed = collapsible !== "none" && !isOpen

    const Comp = asChild ? Slot : "div"

    const handleClick = (e: React.MouseEvent) => {
        if (hasSubMenu) {
            if (isCollapsed) setOpen(true)
            setSubOpen(!isSubOpen)
        } else {
            onClick?.()
        }
    }

    return (
        <div ref={ref} className="select-none">
            <Comp
                onClick={handleClick}
                className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground",
                    className
                )}
                {...props}
            >
                {asChild ? children : (
                    <>
                        {/* 1. Logic: Show Icon OR First Letter fallback */}
                        {(icon || (isCollapsed && label)) && (
                            <span className={cn("shrink-0 flex items-center justify-center size-5", !isOpen && "mx-auto")}>
                                {icon ? (
                                    icon
                                ) : isCollapsed ? (
                                    <span className="text-xs font-bold opacity-70 border rounded size-5 flex items-center justify-center bg-background/50">
                                        {label.charAt(0).toUpperCase()}
                                    </span>
                                ) : null}
                            </span>
                        )}

                        {/* 2. Label: Only visible when expanded */}
                        <AnimatePresence mode="popLayout">
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="flex-1 truncate"
                                >
                                    {label}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {/* 3. Chevron: Only visible when expanded and has sub-menu */}
                        {!isCollapsed && hasSubMenu && (
                            <span className={cn("size-4 opacity-50 transition-transform flex items-center justify-center [&_svg]:size-full", isSubOpen && "rotate-90")}>
                                {config.icons?.chevronRight}
                            </span>
                        )}
                    </>
                )}
            </Comp>

            {/* 4. Sub-Menu Content */}
            <AnimatePresence>
                {!isCollapsed && isSubOpen && hasSubMenu && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-4 border-l border-sidebar-border/40 pl-2 mt-1 space-y-1"
                    >
                        {subMenu || (!asChild && children)}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
})
SidebarItem.displayName = "SidebarItem"

// --- 5. Triggers & Insets ---
export const SidebarTrigger = ({ className, ...props }: React.ComponentProps<"button">) => {
    const { toggle, collapsible, isMobile } = useSidebar()
    const config = useFyskConfig()

    // If on desktop AND collapsible is 'none', hide the trigger.
    // BUT if on mobile, ALWAYS show the trigger so the user can open the nav.
    if (!isMobile && collapsible === "none") return null

    return (
        <button
            onClick={toggle}
            className={cn("p-2 rounded-md hover:bg-sidebar-accent transition-colors", className)}
            {...props}
        >
            <span className="size-4 flex items-center justify-center [&_svg]:size-full">
                {config.icons?.panelLeft}
            </span>
        </button>
    )
}

export const SidebarInset = ({ className, children, ...props }: React.ComponentProps<"main">) => {
    return (
        <main className={cn("flex-1 transition-all duration-300 w-full", className)} {...props}>
            {children}
        </main>
    )
}
