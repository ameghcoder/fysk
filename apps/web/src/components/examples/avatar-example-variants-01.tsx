import { Avatar } from "@fysk/ui"

export default function AvatarVariants() {
    return (
        <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col gap-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase">Default</h4>
                <div className="flex items-center gap-4">
                    <Avatar src="https://github.com/shadcn.png" alt="shadcn" size="sm" />
                    <Avatar src="https://github.com/shadcn.png" alt="shadcn" size="md" />
                    <Avatar src="https://github.com/shadcn.png" alt="shadcn" size="lg" />
                    <Avatar src="https://github.com/shadcn.png" alt="shadcn" size="xl" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase">Outline</h4>
                <div className="flex items-center gap-4">
                    <Avatar src="https://github.com/shadcn.png" alt="shadcn" variant="outline" size="sm" />
                    <Avatar src="https://github.com/shadcn.png" alt="shadcn" variant="outline" size="md" />
                    <Avatar src="https://github.com/shadcn.png" alt="shadcn" variant="outline" size="lg" />
                    <Avatar src="https://github.com/shadcn.png" alt="shadcn" variant="outline" size="xl" />
                </div>
            </div>
        </div>
    )
}
