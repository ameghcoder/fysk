"use client";
import * as React from "react"
import { FolderOpen, FileText, LayoutList, Search } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const emptyVariants = cva(
    "flex flex-col items-center justify-center text-center p-8 rounded-xl border-2 border-dashed border-border bg-background/50 backdrop-blur-sm transition-all animate-fade-in",
    {
        variants: {
            variant: {
                default: "border-border",
                folder: "border-muted",
                post: "border-muted",
                details: "border-muted",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)


export interface EmptyProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyVariants> {
    title?: string
    description?: string
    icon?: React.ReactNode
    action?: React.ReactNode
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
    ({ className, variant: propsVariant, title: propsTitle, description: propsDescription, icon, action, children, ...props }, ref) => {
        const variant = propsVariant || "default"
        const title = propsTitle || "Nothing Found"
        const description = propsDescription || "No data available to show"
        const defaultIcon = React.useMemo(() => {
            switch (variant) {
                case "folder":
                    return <FolderOpen className="h-12 w-12 text-muted-foreground/40" />
                case "post":
                    return <FileText className="h-12 w-12 text-muted-foreground/40" />
                case "details":
                    return <LayoutList className="h-12 w-12 text-muted-foreground/40" />
                default:
                    return <Search className="h-12 w-12 text-muted-foreground/40" />
            }
        }, [variant])

        const activeIcon = icon || defaultIcon

        return (
            <div
                ref={ref}
                className={cn(emptyVariants({ variant, className }))}
                {...props}
            >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/30 mb-4 transition-transform duration-500 hover:scale-110">
                    {activeIcon}
                </div>
                {title && (
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                        {title}
                    </h3>
                )}
                {description && (
                    <p className="text-sm text-muted-foreground max-w-xs mb-6">
                        {description}
                    </p>
                )}
                {children}
                {action && <div className="mt-2">{action}</div>}
            </div>
        )
    }
)
Empty.displayName = "Empty"

export { Empty }
