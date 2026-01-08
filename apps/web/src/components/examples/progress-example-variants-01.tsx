import { Progress } from "@fysk/ui"

export default function ProgressVariants() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <Progress value={30} variant="default" label="Default" showValue />
            <Progress value={45} variant="gradient" label="Gradient" showValue />
            <Progress value={60} variant="striped" label="Striped" showValue />
            <Progress value={75} variant="glow" label="Glow" showValue />
            <Progress value={90} variant="neon" label="Neon" showValue />
        </div>
    )
}
