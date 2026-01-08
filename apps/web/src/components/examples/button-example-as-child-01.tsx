import { Button } from "@fysk/ui"

export default function ButtonAsChild() {
    return (
        <Button asChild>
            <a href="#">Login with Link Tag</a>
        </Button>
    )
}
