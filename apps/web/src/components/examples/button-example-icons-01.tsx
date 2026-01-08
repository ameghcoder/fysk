import { Button } from "@fysk/ui"

export default function ButtonIcons() {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <Button icon={<span className="text-lg">🔍</span>}>Search</Button>
            <Button icon={<span className="text-lg">➡️</span>} iconPosition="end">Next Step</Button>
        </div>
    )
}
