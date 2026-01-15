import { Progress } from "@fysk/ui"

export default function ProgressSegments() {
    return (
        <Progress
            segments={[
                { value: 20, color: "#ef4444", label: "System" },
                { value: 35, color: "#3b82f6", label: "User" },
                { value: 15, color: "#22c55e", label: "Cache" },
            ]}
            showValue
            label="Disk Usage"
        />
    )
}


