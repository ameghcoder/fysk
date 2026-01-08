import { Input } from "@fysk/ui"
import { Mail, Search } from "lucide-react"

export default function InputIcons() {
    return (
        <div className="flex flex-col gap-4 w-full max-w-sm">
            <Input placeholder="Search..." icon={<Search />} />
            <Input placeholder="Email" icon={<Mail />} iconPosition="end" />
        </div>
    )
}
