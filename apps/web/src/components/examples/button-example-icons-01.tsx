import { Button } from "@fysk/ui"
import { Search, ArrowRight } from "lucide-react"

export default function ButtonIcons() {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <Button icon={<Search className="size-4" />}>Search</Button>
            <Button icon={<ArrowRight className="size-4" />} iconPosition="end">Next Step</Button>
        </div>
    )
}
