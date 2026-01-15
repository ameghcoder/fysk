import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@fysk/ui"

export default function TooltipRich() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline">Rich Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent
                title="Information"
                description="This is a detailed description of what this button does."
                shortcut="mod+S"
                variant="glass"
                className="w-80"
            >
                <div className="flex items-center gap-2 text-xs text-primary mt-2">
                    View Analytics →
                </div>
            </TooltipContent>
        </Tooltip>
    )
}


