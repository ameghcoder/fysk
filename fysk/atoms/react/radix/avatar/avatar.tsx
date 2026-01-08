"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useFyskConfig } from "@/components/fysk-provider"

const avatarVariants = cva(
    "relative flex shrink-0 overflow-hidden rounded-full transition-all duration-150 active:scale-[0.98]",
    {
        variants: {
            size: {
                sm: "h-8 w-8 text-xs",
                md: "h-10 w-10 text-sm",
                lg: "h-12 w-12 text-base",
                xl: "h-16 w-16 text-xl",
            },
            variant: {
                default: "border border-border",
                outline: "border-2 border-border bg-transparent",
                ghost: "border-none bg-transparent",
            }
        },
        defaultVariants: {
            size: "md",
            variant: "default",
        },
    }
)

export interface AvatarProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
    src?: string
    alt?: string
    fallback?: React.ReactNode
    state?: "idle" | "loading" | "error"
    iconLoading?: React.ReactNode
    iconError?: React.ReactNode
}

const Avatar = React.forwardRef<
    React.ComponentRef<typeof AvatarPrimitive.Root>,
    AvatarProps
>(({ className, src, alt, fallback, size, variant, state = "idle", iconLoading: propIconLoading, iconError: propIconError, ...props }, ref) => {
    const config = useFyskConfig()

    const isLoading = state === "loading"
    const isError = state === "error"

    const finalIconLoading = propIconLoading || config.icons?.loading
    const finalIconError = propIconError || config.icons?.error

    // Brain-like initial extraction
    const getInitials = (name?: string) => {
        if (!name) return "BN" // Brain Fallback
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <AvatarPrimitive.Root
            ref={ref}
            className={cn(avatarVariants({ size, variant, className }))}
            {...props}
        >
            <AvatarPrimitive.Image
                src={src}
                alt={alt}
                className={cn("aspect-square h-full w-full object-cover", (isLoading || isError) && "opacity-50")}
            />
            <AvatarPrimitive.Fallback
                className="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium"
            >
                {fallback || getInitials(alt)}
            </AvatarPrimitive.Fallback>

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-full backdrop-blur-xs text-primary">
                    <span className="[&_svg]:size-1/2 [&_svg]:shrink-0 flex items-center justify-center w-full h-full">
                        {finalIconLoading}
                    </span>
                </div>
            )}

            {isError && (
                <div className="absolute inset-0 flex items-center justify-center bg-background rounded-full backdrop-blur-xs text-destructive">
                    <span className="[&_svg]:size-1/2 [&_svg]:shrink-0 flex items-center justify-center w-full h-full">
                        {finalIconError}
                    </span>
                </div>
            )}
        </AvatarPrimitive.Root>
    )
})
Avatar.displayName = AvatarPrimitive.Root.displayName

export { Avatar }
