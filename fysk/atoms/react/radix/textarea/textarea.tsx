"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaVariants = cva(
    "flex w-full rounded-md px-6 py-4 text-base transition-all placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]",
    {
        variants: {
            variant: {
                default: "border border-border/50 bg-background focus-within:ring-2 focus-within:ring-ring/30",
                filled: "border-transparent bg-muted focus-within:bg-background border-border/50 focus-within:ring-2 focus-within:ring-ring/30",
                double: "border-2 border-border bg-transparent focus-within:border-border focus-within:ring-2 focus-within:ring-ring/30",
                ghost: "border-transparent bg-transparent hover:bg-muted focus-within:bg-background border-border focus-within:ring-2 focus-within:ring-ring/30",
                deep: "border border-border/50 bg-muted/20 shadow-[inset_0px_-1px_2px_0px_#00000052] focus-within:bg-background focus-within:ring-2 focus-within:ring-ring/30",
            },
            glow: {
                true: "shadow-[0_0_15px_-5px_rgba(var(--primary-rgb,0,0,0),0.3)] border-primary/30",
                false: ""
            }
        },
        defaultVariants: {
            variant: "default",
            glow: false,
        },
    }
)

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
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
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, variant, glow, autoSize = false, maxHeight, header, footer, ...props }, ref) => {
        const internalRef = React.useRef<HTMLTextAreaElement>(null)

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

        const textareaElement = (
            <textarea
                className={cn(
                    "flex w-full bg-transparent text-base placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 fysk-textarea-scrollbar",
                    autoSize && "resize-none overflow-hidden",
                    !(header || footer) && "min-h-[80px]",
                    (header || footer) && "px-0 py-0",
                    footer && "resize-none",
                    className
                )}
                ref={combinedRef}
                onInput={handleInput}
                {...props}
            />
        )

        // If no header/footer, return standard textarea with styling
        if (!header && !footer) {
            return (
                <div className={cn(
                    textareaVariants({ variant, glow }),
                    "flex flex-col"
                )}>
                    {textareaElement}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .fysk-textarea-scrollbar::-webkit-scrollbar {
                            width: 6px;
                        }
                        .fysk-textarea-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .fysk-textarea-scrollbar::-webkit-scrollbar-thumb {
                            background: hsl(var(--border) / 0.5);
                            border-radius: 10px;
                        }
                        .fysk-textarea-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: hsl(var(--border));
                        }
                    `}} />
                </div>
            )
        }

        return (
            <div className={cn(
                "relative flex flex-col w-full transition-all",
                textareaVariants({ variant, glow }),
                "p-0" // Reset padding since we have internal structural elements
            )}>
                {header && (
                    <div className="px-3 pt-2 pb-1 border-b border-border/5">
                        {header}
                    </div>
                )}
                <div className="px-3 py-2 flex flex-col flex-1 min-h-[40px]">
                    {textareaElement}
                </div>
                {footer && (
                    <div className="px-3 pb-2 pt-1 mt-auto border-t border-border/5">
                        {footer}
                    </div>
                )}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .fysk-textarea-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .fysk-textarea-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .fysk-textarea-scrollbar::-webkit-scrollbar-thumb {
                        background: hsl(var(--border) / 0.5);
                        border-radius: 10px;
                    }
                    .fysk-textarea-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: hsl(var(--border));
                    }
                `}} />
            </div>
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
