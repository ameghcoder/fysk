import { Button } from "@fysk/ui"

export default function ButtonSizes() {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <Button size="icon">
                <span className="text-lg">🔍</span>
            </Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
        </div>
    )
}
