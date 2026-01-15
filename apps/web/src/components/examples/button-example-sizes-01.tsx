import { Button } from "@fysk/ui"
import { Search } from "lucide-react"

export default function ButtonSizes() {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <Button size="icon">
                <Search className="size-4" />
            </Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
        </div>
    )
}
