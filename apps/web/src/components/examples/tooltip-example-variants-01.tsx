import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@fysk/ui"

export default function TooltipVariants() {
    return (
        <div className="flex flex-wrap gap-4">
            <Tooltip>
                <TooltipTrigger asChild><Button variant="outline">Default</Button></TooltipTrigger>
                <TooltipContent variant="default">Default Variant</TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild><Button variant="outline">Outline</Button></TooltipTrigger>
                <TooltipContent variant="outline">Outline Variant</TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild><Button variant="outline">Glass</Button></TooltipTrigger>
                <TooltipContent variant="glass">Glass Variant</TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild><Button variant="outline">Neon</Button></TooltipTrigger>
                <TooltipContent variant="neon" shortcut="N">Neon Variant</TooltipContent>
            </Tooltip>
        </div>
    )
}
