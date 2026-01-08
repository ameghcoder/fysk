import { Badge } from "@fysk/ui"

export default function BadgeModern() {
    return (
        <div className="flex flex-wrap gap-4">
            <Badge variant="primary" badgeStyle="modern">Primary</Badge>
            <Badge variant="success" badgeStyle="modern">Success</Badge>
            <Badge variant="error" badgeStyle="modern">Error</Badge>
            <Badge variant="warning" badgeStyle="modern">Warning</Badge>
            <Badge variant="info" badgeStyle="modern">Info</Badge>
        </div>
    )
}
