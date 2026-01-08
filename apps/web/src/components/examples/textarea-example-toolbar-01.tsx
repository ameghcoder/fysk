import { Textarea, Button } from "@fysk/ui"
import { Send, Bold, Italic } from "lucide-react"

export default function TextareaToolbar() {
    return (
        <Textarea
            variant="filled"
            placeholder="Write a comment..."
            header={
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                        <Bold className="size-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Italic className="size-4" />
                    </Button>
                </div>
            }
            footer={
                <div className="flex justify-end">
                    <Button size="sm" variant="outline">
                        <Send className="mr-2 size-4" />
                        <span>Post Comment</span>
                    </Button>
                </div>
            }
        />
    )
}
