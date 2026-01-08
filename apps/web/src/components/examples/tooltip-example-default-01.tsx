"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@fysk/ui"

export default function TooltipDemo({
    variant,
    title,
    description,
    shortcut,
    showArrow,
    side,
    sideOffset,
    delayDuration,
    skipDelayDuration,
    size,
    disableHoverableContent,
    children,
    ...props
}: any) {
    return (
        <Tooltip
            variant={variant}
            size={size}
            delayDuration={delayDuration}
            skipDelayDuration={skipDelayDuration}
            disableHoverableContent={disableHoverableContent}
            {...props}
        >
            <TooltipTrigger asChild>
                {
                    children ? children :
                        <Button variant={"secondary"}>Hover</Button>
                }
            </TooltipTrigger>
            <TooltipContent
                title={title}
                description={description}
                shortcut={shortcut}
                showArrow={showArrow}
                side={side}
                sideOffset={sideOffset}
            >
                {!title && !description && "Add to library"}
            </TooltipContent>
        </Tooltip>
    )
}
