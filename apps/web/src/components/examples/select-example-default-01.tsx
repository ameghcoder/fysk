'use client'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@fysk/ui"

interface SelectDemoProps {
    className?: string
    variant?: "default" | "outline" | "ghost" | "glass"
    state?: "idle" | "loading" | "success" | "error"
    selection?: "single" | "multiple"
    disabled?: boolean
}

export default function SelectDemo({ className, variant, state, selection, disabled }: SelectDemoProps) {
    return (
        <Select selection={selection} disabled={disabled}>
            <SelectTrigger className={className ?? "w-[180px]"} variant={variant} state={state}>
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
