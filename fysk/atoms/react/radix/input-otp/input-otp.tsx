"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Minus } from "lucide-react"

export interface OTPInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
    length?: number
    onChange?: (value: string) => void
    variant?: "default" | "condensed" | "underline"
    state?: "idle" | "loading" | "success" | "error"
    inputType?: "numeric" | "alphanumeric" | "alpha"
    Icon?: React.ReactNode
}

const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
    ({
        length: propLength,
        onChange,
        variant = "default",
        state = "idle",
        inputType = "numeric",
        Icon,
        className,
        disabled,
        ...props
    }, ref) => {
        const length = propLength || 6
        const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(""))
        const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

        React.useEffect(() => {
            setOtp((prev) => {
                if (prev.length === length) return prev
                const newOtp = new Array(length).fill("")
                // Preserve existing values, truncating if necessary
                for (let i = 0; i < Math.min(prev.length, length); i++) {
                    newOtp[i] = prev[i]
                }
                return newOtp
            })
        }, [length])

        const patterns = {
            numeric: /^[0-9]$/,
            alpha: /^[a-zA-Z]$/,
            alphanumeric: /^[a-zA-Z0-9]$/
        }

        const validateChar = (char: string) => {
            return patterns[inputType].test(char)
        }

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
            const value = e.target.value

            // Handle clearing
            if (value === "") {
                const newOtp = [...otp]
                newOtp[index] = ""
                setOtp(newOtp)
                onChange?.(newOtp.join(""))
                return
            }

            // Get the last character typed
            const char = value.substring(value.length - 1)

            if (!validateChar(char)) return

            const newOtp = [...otp]
            newOtp[index] = char
            setOtp(newOtp)

            const finalOtp = newOtp.join("")
            onChange?.(finalOtp)

            // Move to next input
            if (char && index < length - 1) {
                inputRefs.current[index + 1]?.focus()
            }
        }

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
            if (e.key === "Backspace" && !otp[index] && index > 0) {
                // Determine if we are crossing a group boundary (for condensation)
                inputRefs.current[index - 1]?.focus()
            }
        }

        const handlePaste = (e: React.ClipboardEvent) => {
            e.preventDefault()
            const data = e.clipboardData.getData("text").slice(0, length)

            // Validate entire paste
            const validData = data.split("").every(char => validateChar(char))
            if (!validData) return

            const newOtp = [...otp]
            data.split("").forEach((char, i) => {
                newOtp[i] = char
            })
            setOtp(newOtp)
            onChange?.(newOtp.join(""))

            // Focus last filled or next empty
            const nextIndex = data.length < length ? data.length : length - 1
            inputRefs.current[nextIndex]?.focus()
        }

        // Helper to determine if we should show a separator
        const showSeparator = (index: number) => {
            if (variant !== "condensed") return false
            // Default 3-3 split for length 6, or split in half for even lengths
            const halfPoint = Math.floor(length / 2)
            return index === halfPoint - 1 && length > 2
        }

        const isDisabled = state === "loading" || disabled

        return (
            <div
                ref={ref}
                className={cn(
                    "flex items-center",
                    variant === "default" && "gap-2",
                    variant === "condensed" && "gap-1", // Visual gap handled by group styles usually, but we need gap for the separator
                    variant === "underline" && "gap-3",
                    className
                )}
                onPaste={handlePaste}
            >
                {otp.map((digit, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className={cn("relative flex items-center")}>
                                <input
                                    ref={(el) => {
                                        inputRefs.current[index] = el
                                    }}
                                    type={inputType === "numeric" ? "tel" : "text"}
                                    inputMode={inputType === "numeric" ? "numeric" : "text"}
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    disabled={isDisabled}
                                    className={cn(
                                        "flex h-10 w-10 items-center justify-center text-center text-base font-semibold transition-all focus:z-10 focus:outline-none disabled:opacity-50",
                                        // Default Variant
                                        variant === "default" && "rounded-md border border-border bg-background focus:ring-2 focus:ring-ring/30 focus:border-ring",

                                        // Condensed Variant
                                        variant === "condensed" && "h-10 w-10 border-y border-r border-border bg-background first:rounded-l-md first:border-l last:rounded-r-md focus:ring-2 focus:ring-inset focus:ring-ring/30",

                                        // Underline Variant
                                        variant === "underline" && "h-10 w-10 border-b-2 border-border bg-transparent rounded-none focus:border-ring px-0",

                                        // States
                                        state === "success" && "border-[#22c55e]/50 bg-[#22c55e]/5 text-[#22c55e]",
                                        state === "error" && "border-destructive/50 bg-destructive/5 text-destructive",
                                        state === "loading" && "animate-pulse opacity-70 bg-muted cursor-wait"
                                    )}
                                    {...props}
                                />
                            </div>
                            {showSeparator(index) && (
                                <div className="flex items-center justify-center w-4 text-muted-foreground">
                                    {
                                        Icon || <Minus className="w-4 h-4" />
                                    }
                                </div>
                            )}
                        </React.Fragment>
                    )
                })}
            </div>
        )
    }
)
OTPInput.displayName = "OTPInput"

export { OTPInput }
