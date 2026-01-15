import { Badge } from "@fysk/ui"

export default function BadgeDots() {
    return (
        <div className="flex flex-wrap gap-4 items-center">
            <Badge variant="success" dot>Active</Badge>
            <Badge variant="error" dot>Offline</Badge>
            <Badge variant="warning" dot dotBlink={false}>Away</Badge>
            <Badge variant="info" dot>Processing</Badge>
        </div>
    )
}


