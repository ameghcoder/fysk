"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import * as Popover from "@radix-ui/react-popover"
import { cva, type VariantProps } from "class-variance-authority"

import { useFyskConfig } from "@/components/fysk-provider"
import { cn } from "@/lib/utils"

const selectTriggerVariants = cva(
    "flex h-10 w-full items-center justify-between rounded-md px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all",
    {
        variants: {
            variant: {
                default: "border border-input bg-background",
                outline: "border-2 border-border bg-transparent",
                ghost: "border border-transparent bg-transparent hover:bg-muted",
                glass: "bg-foreground/5 backdrop-blur-md border border-border/50",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

// --- CONTEXT & TYPES ---

type SelectionMode = "single" | "multiple"

interface SelectContextValue {
    selection: SelectionMode
    selectedValues: string[]
    onValueChange: (value: string) => void
    onValueRemove: (value: string) => void
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

function useSelectContext() {
    return React.useContext(SelectContext)
}

// --- SINGLE SELECT COMPONENTS (Internal Re-exports) ---

const SelectGroupRoot = SelectPrimitive.Group
const SelectValueRoot = SelectPrimitive.Value

// --- SHARED UTILS ---

const SelectScrollUpButton = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => {
    const config = useFyskConfig()
    return (
        <SelectPrimitive.ScrollUpButton
            ref={ref}
            className={cn("flex cursor-default items-center justify-center py-1", className)}
            {...props}
        >
            <span className="h-4 w-4 flex items-center justify-center [&_svg]:size-full">
                {config.icons?.chevronUp}
            </span>
        </SelectPrimitive.ScrollUpButton>
    )
})
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => {
    const config = useFyskConfig()
    return (
        <SelectPrimitive.ScrollDownButton
            ref={ref}
            className={cn("flex cursor-default items-center justify-center py-1", className)}
            {...props}
        >
            <span className="h-4 w-4 flex items-center justify-center [&_svg]:size-full">
                {config.icons?.chevronDown}
            </span>
        </SelectPrimitive.ScrollDownButton>
    )
})
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

// --- MULTI SELECT INTERNAL COMPONENTS ---

const MultiSelectGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => <div ref={ref} className={cn("", className)} {...props} />
)
MultiSelectGroup.displayName = "MultiSelectGroup"

const MultiSelectLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
    )
)
MultiSelectLabel.displayName = "MultiSelectLabel"

const MultiSelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string; disabled?: boolean }>(
    ({ className, children, value, disabled = false, ...props }, ref) => {
        const context = useSelectContext()
        const config = useFyskConfig()

        if (!context) {
            throw new Error("MultiSelectItem must be used within a MultiSelect")
        }

        const { selectedValues, onValueChange } = context
        const isSelected = selectedValues.includes(value)

        return (
            <div
                ref={ref}
                role="option"
                aria-selected={isSelected}
                data-state={isSelected ? "checked" : "unchecked"}
                className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    disabled && "pointer-events-none opacity-50",
                    className
                )}
                onClick={() => !disabled && onValueChange(value)}
                onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && !disabled) {
                        e.preventDefault()
                        onValueChange(value)
                    }
                }}
                tabIndex={disabled ? -1 : 0}
                {...props}
            >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {isSelected && (
                        <span className="h-4 w-4 flex items-center justify-center [&_svg]:size-full text-primary">
                            {config.icons?.success}
                        </span>
                    )}
                </span>
                {children}
            </div>
        )
    }
)
MultiSelectItem.displayName = "MultiSelectItem"

const MultiSelectSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
    )
)
MultiSelectSeparator.displayName = "MultiSelectSeparator"

const MultiSelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "center" | "end"; sideOffset?: number }>(
    ({ className, children, align = "start", sideOffset = 4, ...props }, ref) => (
        <Popover.Portal>
            <Popover.Content
                ref={ref}
                align={align}
                sideOffset={sideOffset}
                className={cn(
                    "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    className
                )}
                {...props}
            >
                <div className="max-h-[300px] overflow-y-auto p-1">{children}</div>
            </Popover.Content>
        </Popover.Portal>
    )
)
MultiSelectContent.displayName = "MultiSelectContent"

interface MultiSelectTriggerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof selectTriggerVariants> {
    placeholder?: string
    maxDisplayItems?: number
    state?: "idle" | "loading" | "success" | "error"
}

const MultiSelectTrigger = React.forwardRef<HTMLDivElement, MultiSelectTriggerProps>(
    ({ className, variant, state = "idle", placeholder = "Select items...", maxDisplayItems = 1, ...props }, ref) => {
        const context = useSelectContext()
        const config = useFyskConfig()

        if (!context) {
            throw new Error("MultiSelectTrigger must be used within a MultiSelect")
        }

        const { selectedValues, onValueRemove } = context
        const hasValues = selectedValues.length > 0
        const displayValues = selectedValues.slice(0, maxDisplayItems)
        const remainingCount = selectedValues.length - maxDisplayItems

        const isLoading = state === "loading"
        const isSuccess = state === "success"
        const isError = state === "error"

        const stateIcon = isLoading ? config.icons?.loading : isSuccess ? config.icons?.success : isError ? config.icons?.error : null

        return (
            <Popover.Trigger asChild>
                <div
                    ref={ref}
                    role="combobox"
                    aria-expanded="false"
                    tabIndex={0}
                    data-state={state}
                    className={cn(
                        selectTriggerVariants({ variant }),
                        "min-h-10 cursor-pointer overflow-hidden",
                        isSuccess && "border-green-500/50",
                        isError && "border-destructive/50",
                        className
                    )}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            e.currentTarget.click()
                        }
                    }}
                    {...props}
                >
                    <div className="flex flex-1 flex-wrap items-center gap-1 overflow-hidden">
                        {hasValues ? (
                            <>
                                {displayValues.map((value) => (
                                    <span key={value} className="inline-flex items-center gap-1 rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground max-w-[120px]">
                                        <span className="truncate">{value}</span>
                                        <span
                                            role="button"
                                            tabIndex={0}
                                            onClick={(e) => { e.stopPropagation(); onValueRemove(value) }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    onValueRemove(value)
                                                }
                                            }}
                                            className="ml-0.5 rounded-xs hover:bg-muted/50 p-0.5 transition-colors focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                                            aria-label={`Remove ${value}`}
                                        >
                                            <span className="h-3 w-3 flex items-center justify-center [&_svg]:size-full">
                                                {config.icons?.close}
                                            </span>
                                        </span>
                                    </span>
                                ))}
                                {remainingCount > 0 && (
                                    <span className="inline-flex items-center rounded-sm bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                        +{remainingCount} more
                                    </span>
                                )}
                            </>
                        ) : (
                            <span className="text-muted-foreground">{placeholder}</span>
                        )}
                    </div>
                    <span className={cn(
                        "h-4 w-4 shrink-0 ml-2 flex items-center justify-center [&_svg]:size-full",
                        stateIcon ? "" : "opacity-50",
                        isLoading && "[&_svg]:animate-spin text-primary",
                        isSuccess && "text-green-500",
                        isError && "text-destructive"
                    )}>
                        {stateIcon || config.icons?.chevronDown}
                    </span>
                </div>
            </Popover.Trigger>
        )
    }
)
MultiSelectTrigger.displayName = "MultiSelectTrigger"

interface MultiSelectProps {
    value?: string[]
    defaultValue?: string[]
    onValueChange?: (value: string[]) => void
    disabled?: boolean
    children?: React.ReactNode
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
    ({ value: controlledValue, defaultValue = [], onValueChange, disabled = false, children, open: controlledOpen, defaultOpen = false, onOpenChange }, ref) => {
        const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue)
        const [internalOpen, setInternalOpen] = React.useState(defaultOpen)

        const selectedValues = controlledValue !== undefined ? controlledValue : internalValue
        const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

        const handleValueChange = React.useCallback((v: string) => {
            const newValue = selectedValues.includes(v) ? selectedValues.filter((x) => x !== v) : [...selectedValues, v]
            if (controlledValue === undefined) setInternalValue(newValue)
            onValueChange?.(newValue)
        }, [selectedValues, controlledValue, onValueChange])

        const handleValueRemove = React.useCallback((v: string) => {
            const newValue = selectedValues.filter((x) => x !== v)
            if (controlledValue === undefined) setInternalValue(newValue)
            onValueChange?.(newValue)
        }, [selectedValues, controlledValue, onValueChange])

        return (
            <SelectContext.Provider value={{ selection: "multiple", selectedValues, onValueChange: handleValueChange, onValueRemove: handleValueRemove }}>
                <Popover.Root open={isOpen} onOpenChange={(o) => { if (controlledOpen === undefined) setInternalOpen(o); onOpenChange?.(o) }}>
                    <div ref={ref} data-disabled={disabled ? "" : undefined} className={cn(disabled && "pointer-events-none opacity-50")}>
                        {children}
                    </div>
                </Popover.Root>
            </SelectContext.Provider>
        )
    }
)
MultiSelect.displayName = "MultiSelect"

// --- PUBLIC UNIFIED COMPONENTS ---

const SelectValue = SelectPrimitive.Value
SelectValue.displayName = "SelectValue"

const SelectGroup = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Group>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>
>(({ className, ...props }, ref) => {
    const context = useSelectContext()
    if (context?.selection === "multiple") {
        return <MultiSelectGroup className={className} {...(props as any)} ref={ref} />
    }
    return <SelectPrimitive.Group className={className} {...props} ref={ref} />
})
SelectGroup.displayName = "SelectGroup"

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, VariantProps<typeof selectTriggerVariants> {
    placeholder?: string
    maxDisplayItems?: number
    state?: "idle" | "loading" | "success" | "error"
}

const SelectTrigger = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Trigger>,
    SelectTriggerProps
>(({ className, children, placeholder, variant, state = "idle", maxDisplayItems = 1, ...props }, ref) => {
    const context = useSelectContext()
    const config = useFyskConfig()

    const isLoading = state === "loading"
    const isSuccess = state === "success"
    const isError = state === "error"

    // Extract placeholder from SelectValue child if not provided
    let effectivePlaceholder = placeholder
    if (!effectivePlaceholder) {
        React.Children.forEach(children, child => {
            if (React.isValidElement(child) && (child.type as any).displayName === "SelectValue") {
                effectivePlaceholder = (child.props as any).placeholder
            }
        })
    }
    if (!effectivePlaceholder) effectivePlaceholder = "Select items..."

    if (context && context.selection === "multiple") {
        return (
            <MultiSelectTrigger
                className={className}
                placeholder={effectivePlaceholder}
                maxDisplayItems={maxDisplayItems}
                variant={variant}
                state={state}
                {...(props as any)}
                ref={ref}
            />
        )
    }

    const stateIcon = isLoading ? config.icons?.loading : isSuccess ? config.icons?.success : isError ? config.icons?.error : null

    return (
        <SelectPrimitive.Trigger
            ref={ref}
            data-state={state}
            className={cn(
                selectTriggerVariants({ variant }),
                isSuccess && "border-green-500/50",
                isError && "border-destructive/50",
                className
            )}
            {...props}
        >
            {children}
            <SelectPrimitive.Icon asChild>
                <span className={cn(
                    "h-4 w-4 flex items-center justify-center [&_svg]:size-full",
                    stateIcon ? "" : "opacity-50",
                    isLoading && "[&_svg]:animate-spin text-primary",
                    isSuccess && "text-green-500",
                    isError && "text-destructive"
                )}>
                    {stateIcon || config.icons?.chevronDown}
                </span>
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => {
    const context = useSelectContext()

    if (context?.selection === "multiple") {
        return (
            <MultiSelectContent className={className} {...(props as any)} ref={ref}>
                {children}
            </MultiSelectContent>
        )
    }

    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                ref={ref}
                className={cn(
                    "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border border-border/25 bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    position === "popper" &&
                    "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                    className
                )}
                position={position}
                {...props}
            >
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport
                    className={cn(
                        "p-1",
                        position === "popper" &&
                        "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)"
                    )}
                >
                    {children}
                </SelectPrimitive.Viewport>
                <SelectScrollDownButton />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    )
})
SelectContent.displayName = "SelectContent"

const SelectLabel = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => {
    const context = useSelectContext()
    if (context?.selection === "multiple") {
        return <MultiSelectLabel className={className} {...(props as any)} ref={ref} />
    }
    return (
        <SelectPrimitive.Label
            ref={ref}
            className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
            {...props}
        />
    )
})
SelectLabel.displayName = "SelectLabel"

const SelectItem = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
    const context = useSelectContext()
    const config = useFyskConfig()

    if (context?.selection === "multiple") {
        return (
            <MultiSelectItem
                className={className}
                value={(props as any).value}
                disabled={(props as any).disabled}
                {...(props as any)}
                ref={ref}
            >
                {children}
            </MultiSelectItem>
        )
    }

    return (
        <SelectPrimitive.Item
            ref={ref}
            className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
                className
            )}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <span className="h-4 w-4 flex items-center justify-center [&_svg]:size-full">
                        {config.icons?.success}
                    </span>
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    )
})
SelectItem.displayName = "SelectItem"

const SelectSeparator = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => {
    const context = useSelectContext()
    if (context?.selection === "multiple") {
        return <MultiSelectSeparator className={className} {...(props as any)} ref={ref} />
    }
    return (
        <SelectPrimitive.Separator
            ref={ref}
            className={cn("-mx-1 my-1 h-px bg-muted", className)}
            {...props}
        />
    )
})
SelectSeparator.displayName = "SelectSeparator"

// --- MAIN WRAPPER ---

interface SelectProps {
    selection?: SelectionMode
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    values?: string[]
    defaultValues?: string[]
    onValuesChange?: (values: string[]) => void
    disabled?: boolean
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    children?: React.ReactNode
    placeholder?: string
    maxDisplayItems?: number
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
    ({ selection = "single", value, defaultValue, onValueChange, values, defaultValues, onValuesChange, disabled, open, defaultOpen, onOpenChange, children }, ref) => {
        if (selection === "multiple") {
            return (
                <MultiSelect
                    ref={ref}
                    value={values}
                    defaultValue={defaultValues}
                    onValueChange={onValuesChange}
                    disabled={disabled}
                    open={open}
                    defaultOpen={defaultOpen}
                    onOpenChange={onOpenChange}
                >
                    {children}
                </MultiSelect>
            )
        }

        return (
            <SelectContext.Provider value={{ selection: "single", selectedValues: [], onValueChange: () => { }, onValueRemove: () => { } }}>
                <SelectPrimitive.Root
                    value={value}
                    defaultValue={defaultValue}
                    onValueChange={onValueChange}
                    disabled={disabled}
                    open={open}
                    defaultOpen={defaultOpen}
                    onOpenChange={onOpenChange}
                >
                    {children}
                </SelectPrimitive.Root>
            </SelectContext.Provider>
        )
    }
)
Select.displayName = "Select"

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectLabel,
    MultiSelectItem,
    MultiSelectSeparator,
    type SelectProps,
    type SelectionMode,
}

