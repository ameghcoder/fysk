"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useFyskConfig, type FyskIconPosition } from "@/components/fysk-provider"

const textareaVariants = cva(
    "flex w-full rounded-md px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive min-h-[80px]",
    {
        variants: {
            variant: {
                default: "border border-input bg-transparent dark:bg-input/30",
                filled: "border border-transparent bg-muted focus-within:bg-background focus-within:border-input",
                double: "border-2 border-border bg-transparent focus-within:border-ring/50",
                ghost: "border border-transparent bg-transparent hover:bg-muted focus-within:bg-background",
                deep: "border border-border/50 bg-muted/20 shadow-[inset_0px_1px_2px_0px_rgba(0,0,0,0.05)] focus-within:bg-background",
                glass: "bg-foreground/5 backdrop-blur-md border border-border/50 text-foreground placeholder:text-muted-foreground/50",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
    /**
     * Optional className for the header.
     */
    headerClassName?: string;
    /**
     * Optional className for the footer.
     */
    footerClassName?: string;
    /**
     * Automatically adjust the height of the textarea based on content.
     */
    autoSize?: boolean
    /**
     * Maximum height when autoSize is enabled.
     */
    maxHeight?: number
    /**
     * Optional header content (e.g., info pills, toolbar).
     */
    header?: React.ReactNode
    /**
     * Optional footer content (e.g., send button, character count).
     */
    footer?: React.ReactNode
    state?: "idle" | "loading" | "success" | "error"
    /** The icon to display. */
    icon?: React.ReactNode
    /** Custom loading icon to override the global default. */
    iconLoading?: React.ReactNode
    /** Custom success icon to override the global default. */
    iconSuccess?: React.ReactNode
    /** Custom error icon to override the global default. */
    iconError?: React.ReactNode
    /** Override the global icon position. */
    iconPosition?: FyskIconPosition
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            className,
            headerClassName,
            footerClassName,
            variant,
            autoSize = false,
            maxHeight,
            header,
            footer,
            state = "idle",
            icon,
            iconLoading: propIconLoading,
            iconSuccess: propIconSuccess,
            iconError: propIconError,
            iconPosition: propIconPosition,
            ...props
        },
        ref
    ) => {
        const config = useFyskConfig()
        const internalRef = React.useRef<HTMLTextAreaElement>(null)

        const isLoading = state === "loading"
        const isSuccess = state === "success"
        const isError = state === "error"

        const activeIconPosition = propIconPosition || config.iconPosition || "start"
        const finalIconLoading = propIconLoading || config.icons?.loading
        const finalIconSuccess = propIconSuccess || config.icons?.success
        const finalIconError = propIconError || config.icons?.error

        const activeIcon = () => {
            if (isLoading) return finalIconLoading
            if (isSuccess) return finalIconSuccess
            if (isError) return finalIconError
            return icon
        }

        const currentIcon = activeIcon()

        // Merge refs: one for internal logic (autoSize) and one for parent (forwardRef)
        const combinedRef = React.useCallback((node: HTMLTextAreaElement) => {
            internalRef.current = node
            if (typeof ref === "function") {
                ref(node)
            } else if (ref) {
                (ref as React.RefObject<HTMLTextAreaElement | null>).current = node
            }
        }, [ref])

        const adjustHeight = React.useCallback(() => {
            if (autoSize && internalRef.current) {
                internalRef.current.style.height = 'auto'
                const nextHeight = internalRef.current.scrollHeight
                if (maxHeight && nextHeight > maxHeight) {
                    internalRef.current.style.height = `${maxHeight}px`
                    internalRef.current.style.overflowY = 'auto'
                } else {
                    internalRef.current.style.height = `${nextHeight}px`
                    internalRef.current.style.overflowY = 'hidden'
                }
            }
        }, [autoSize, maxHeight])

        React.useEffect(() => {
            adjustHeight()
        }, [adjustHeight, props.value])

        const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
            adjustHeight()
            props.onInput?.(e)
        }

        const renderStatusIndicator = () => {
            if (state === "idle" || !currentIcon) return null

            return (
                <div className={cn(
                    "absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none",
                    "animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out fill-mode-both"
                )}>
                    <div className={cn(
                        "flex items-center justify-center p-1.5 rounded-full bg-background/90 shadow-lg border border-border/50 backdrop-blur-md",
                        isSuccess && "text-green-500 border-green-500/30",
                        isError && "text-destructive border-destructive/30",
                        isLoading && "text-primary"
                    )}>
                        <div className="[&_svg]:size-3.5">
                            {currentIcon}
                        </div>
                    </div>
                </div>
            )
        }

        const textareaElement = (
            <div className="relative flex flex-1 w-full h-full">
                {renderStatusIndicator()}
                <textarea
                    className={cn(
                        "flex w-full bg-transparent text-base placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 fysk-textarea-scrollbar md:text-sm px-0 py-0",
                        (autoSize || header || footer) && "resize-none overflow-hidden",
                        !(header || footer) && "min-h-[80px]",
                        className
                    )}
                    ref={combinedRef}
                    onInput={handleInput}
                    {...props}
                />
            </div>
        )

        const containerClasses = cn(
            textareaVariants({ variant }),
            isSuccess && "border-green-500/50",
            isError && "border-destructive/50"
        )

        return (
            <div className={cn(
                "relative flex flex-col w-full transition-all overflow-hidden",
                containerClasses,
                (header || footer) && "p-0"
            )}>
                {header && (
                    <div className={`px-3 py-2 bg-transparent ${headerClassName}`}>
                        {header}
                    </div>
                )}
                <div className={cn(
                    "flex flex-col flex-1",
                    (header || footer) && "px-3 py-2"
                )}>
                    {textareaElement}
                </div>
                {footer && (
                    <div className={`px-3 py-2 mt-auto bg-transparent ${footerClassName}`}>
                        {footer}
                    </div>
                )}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .fysk-textarea-scrollbar::-webkit-scrollbar {
                        width: 4px;
                    }
                    .fysk-textarea-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .fysk-textarea-scrollbar::-webkit-scrollbar-thumb {
                        background: hsl(var(--border) / 0.3);
                        border-radius: 10px;
                    }
                    .fysk-textarea-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: hsl(var(--border) / 0.6);
                    }
                `}} />
            </div>
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }

