import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonGroupVariants = cva(
    "inline-flex items-center rounded-md border border-border bg-background p-1 shadow-sm",
    {
        variants: {
            size: {
                sm: "gap-1",
                md: "gap-1.5",
                lg: "gap-2",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
)

export interface ButtonGroupProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> { }

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
    ({ className, size, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(buttonGroupVariants({ size, className }))}
                {...props}
            />
        )
    }
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
