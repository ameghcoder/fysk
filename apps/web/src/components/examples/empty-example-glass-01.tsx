"use client"

import { Button, Empty } from "@fysk/ui"
import { PlugZap } from "lucide-react"

export default function EmptyGlassDemo() {
    return (
        <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-grid-black/[0.02] dark:bg-grid-white/[0.02]">
            <Empty
                variant="glass"
                icon={<PlugZap className="size-8 text-amber-500" />}
                title="Connect Integration"
                description="Connect your favorite tools to unlock powerful automation features."
                action={
                    <Button variant="glass" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-200/50">
                        Connect Now
                    </Button>
                }
            />
        </div>
    )
}
