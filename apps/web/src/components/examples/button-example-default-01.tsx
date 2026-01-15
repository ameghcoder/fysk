'use client'
import { Button } from "@fysk/ui"

interface ButtonDemoProps {
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "glass"
    size?: "sm" | "md" | "lg" | "xl" | "icon"
    state?: "idle" | "loading" | "success" | "error"
    loadingText?: string
    successText?: string
    errorText?: string
    iconPosition?: "start" | "end"
    children?: React.ReactNode
}

export default function ButtonDemo({
    variant,
    size,
    state,
    loadingText,
    successText,
    errorText,
    iconPosition,
    children = "Click Me"
}: ButtonDemoProps) {
    return (
        <Button
            variant={variant}
            size={size}
            state={state}
            loadingText={loadingText}
            successText={successText}
            errorText={errorText}
            iconPosition={iconPosition}
        >
            {children}
        </Button>
    )
}
