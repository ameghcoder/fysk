import { Badge } from "@fysk/ui"
import { Star, Zap } from "lucide-react"

export default function BadgeDemo() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
            </div>

            <div className="flex flex-wrap gap-2">
                <Badge badgeStyle="modern">Primary Modern</Badge>
                <Badge variant="success" badgeStyle="modern">Success Modern</Badge>
                <Badge variant="error" badgeStyle="modern">Error Modern</Badge>
                <Badge variant="warning" badgeStyle="modern">Warning Modern</Badge>
                <Badge variant="info" badgeStyle="modern">Info Modern</Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
            </div>

            <div className="flex flex-wrap gap-2">
                <Badge dot>Status</Badge>
                <Badge dot dotBlink variant="success">Live</Badge>
                <Badge icon={<Star className="size-3" />}>Featured</Badge>
                <Badge icon={<Zap className="size-3" />} iconPosition="end">Fast</Badge>
            </div>
        </div>
    )
}
