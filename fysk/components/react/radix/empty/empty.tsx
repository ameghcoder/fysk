"use client";
import * as React from "react"
import { FolderOpen } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const emptyVariants = cva(
    "flex flex-col items-center justify-center text-center rounded-lg transition-colors",
    {
        variants: {
            variant: {
                default: "border border-dashed border-border bg-muted/5",
                glass: "bg-foreground/5 backdrop-blur-md border border-border/50 shadow-sm",
                outline: "border border-border bg-background shadow-xs",
                ghost: "bg-transparent border-none shadow-none",
            },
            size: {
                sm: "p-8 min-h-[180px]",
                md: "p-12 min-h-[300px]",
                lg: "p-16 min-h-[400px]",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
)

export interface EmptyProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyVariants> {
    title?: string;
    description?: string;
    // title className
    titleClassName?: string;
    // description className
    descriptionClassName?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
    ({ className, variant, size, title, description, titleClassName, descriptionClassName, icon, action, children, ...props }, ref) => {

        const activeIcon = icon || <FolderOpen className="size-6 text-muted-foreground" />

        return (
            <div
                ref={ref}
                className={cn(emptyVariants({ variant, size, className }))}
                {...props}
            >
                {/* Icon Container */}
                <div className={cn(
                    "flex items-center justify-center rounded-full mb-4",
                    "bg-muted/50 border border-border/50 p-3", // Standard Shadcn-like icon wrapper
                    variant === "glass" && "bg-foreground/10 border-white/10 text-foreground"
                )}>
                    {activeIcon}
                </div>

                {/* Content */}
                <div className="space-y-2 max-w-sm">
                    {title && (
                        <h3 className={cn("text-lg font-semibold tracking-tight text-foreground", titleClassName)}>
                            {title}
                        </h3>
                    )}
                    {description && (
                        <p className={cn("text-sm text-muted-foreground text-pretty", descriptionClassName)}>
                            {description}
                        </p>
                    )}
                </div>

                {/* Children/Custom Content */}
                {children && (
                    <div className="mt-6 w-full">
                        {children}
                    </div>
                )}

                {/* Link/Button Action */}
                {action && (
                    <div className="mt-6">
                        {action}
                    </div>
                )}
            </div>
        )
    }
)
Empty.displayName = "Empty"

export { Empty }
