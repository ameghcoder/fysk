import { Button, Empty } from "@fysk/ui"
import { Plus } from "lucide-react"

export default function EmptyDemo() {
    return (
        <Empty
            title="No projects found"
            description="You haven't created any projects yet. Start by creating a new one."
            action={
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                </Button>
            }
        />
    )
}


