import { Input } from "@fysk/ui"

export default function InputStates() {
    return (
        <div className="grid w-full max-w-sm items-center gap-4">
            <Input state="loading" placeholder="Loading..." />
            <Input state="success" placeholder="Success" />
            <Input state="error" placeholder="Error" />
            <Input disabled placeholder="Disabled" />
        </div>
    )
}
