"use client"

import { Button, Empty } from "@fysk/ui"
import { MessageSquareDashed } from "lucide-react"

export default function EmptyMinimalDemo() {
    return (
        <div className="w-full max-w-sm mx-auto shadow-sm rounded-xl border p-4">
            <div className="border-b pb-3 mb-4">
                <h3 className="font-semibold text-sm">Comments (0)</h3>
            </div>
            <Empty
                variant="ghost"
                size="sm"
                icon={<MessageSquareDashed className="size-6 text-muted-foreground/50" />}
                title="No comments yet"
                description="Be the first to share your thoughts on this post."
                action={<Button variant="outline" size="sm" className="h-8 text-xs">Post Comment</Button>}
            />
        </div>
    )
}
