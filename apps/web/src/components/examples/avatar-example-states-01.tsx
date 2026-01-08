import { Avatar } from "@fysk/ui"

export default function AvatarStates() {
    return (
        <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col gap-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase">Loading</h4>
                <Avatar src="https://github.com/shadcn.png" state="loading" size="lg" />
            </div>
            <div className="flex flex-col gap-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase">Error / Fallback</h4>
                <Avatar src="/invalid.png" alt="John Doe" size="lg" />
            </div>
            <div className="flex flex-col gap-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase">Custom Fallback</h4>
                <Avatar fallback={<span className="text-xs">JD</span>} size="lg" />
            </div>
        </div>
    )
}
