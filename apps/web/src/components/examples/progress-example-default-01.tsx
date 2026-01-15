"use client"

import * as React from "react"
import { Progress } from "@fysk/ui"

export default function ProgressDemo() {
    const [progress, setProgress] = React.useState(13)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="w-full space-y-8 max-w-sm">
            <Progress value={progress} showValue label="Basic Progress" />

            <Progress
                value={45}
                bufferValue={70}
                variant="striped"
                label="Buffering..."
                showValue
            />

            <Progress
                value={80}
                variant="gradient"
                colors={["#facc15", "#f97316", "#ef4444"]}
                label="Multi-color Gradient"
                showValue
            />

            <Progress
                segments={[
                    { value: 30, color: "#22c55e", label: "Success" },
                    { value: 15, color: "#f59f08", label: "Warning" },
                    { value: 10, color: "#ef4444", label: "Error" },
                ]}
                label="Stacked Segments"
            />

            <div className="flex flex-col gap-2">
                <Progress value={100} state="success" showIcon icon="auto" label="Finished Task" showValue />
                <Progress value={20} state="error" showIcon icon="auto" label="Failed Task" showValue />
            </div>
        </div>
    )
}


