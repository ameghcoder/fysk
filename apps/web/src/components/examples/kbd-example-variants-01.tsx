import { Kbd } from "@fysk/ui"

export default function KbdVariants() {
    return (
        <div className="flex flex-wrap gap-4 items-center">
            <Kbd variant="default">A</Kbd>
            <Kbd variant="outline">B</Kbd>
            <Kbd variant="solid">C</Kbd>
            <Kbd variant="glass">D</Kbd>
            <Kbd variant="mac">⌘</Kbd>
            <Kbd variant="modern">K</Kbd>
        </div>
    )
}


