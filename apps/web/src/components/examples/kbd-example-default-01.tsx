import { Kbd, KbdGroup } from "@fysk/ui"

export default function KbdDemo() {
    return (
        <KbdGroup>
            <Kbd keys={["mod"]} />
            <Kbd keys={["shift"]} />
            <Kbd keys={["p"]} />
        </KbdGroup>
    )
}
