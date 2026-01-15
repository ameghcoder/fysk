import { Switch } from "@fysk/ui"

export default function SwitchVariants() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Switch variant="normal" size="sm" />
                <Switch variant="normal" size="md" />
                <Switch variant="normal" size="lg" />
            </div>

            <div className="flex items-center gap-4">
                <Switch variant="square" size="sm" />
                <Switch variant="square" size="md" />
                <Switch variant="square" size="lg" />
            </div>

            <div className="flex items-center gap-4">
                <Switch variant="line" size="sm" />
                <Switch variant="line" size="md" />
                <Switch variant="line" size="lg" />
            </div>
        </div>
    )
}


