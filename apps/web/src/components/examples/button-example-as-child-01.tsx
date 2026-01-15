import { Button } from "@fysk/ui"
import { LogIn } from "lucide-react"

export default function ButtonAsChild() {
    return (
        <Button asChild variant="outline">
            <a href="/login" className="flex items-center gap-2">
                <LogIn className="size-4" />
                Login to Account
            </a>
        </Button>
    )
}
