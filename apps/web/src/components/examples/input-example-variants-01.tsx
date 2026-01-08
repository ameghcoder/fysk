import { Input } from "@fysk/ui"

export default function InputVariants() {
    return (
        <div className="flex flex-col gap-4 w-full max-w-sm">
            <Input variant="default" placeholder="Default variant" />
            <Input variant="filled" placeholder="Filled variant" />
            <Input variant="double" placeholder="Double variant" />
            <Input variant="ghost" placeholder="Ghost variant" />
            <Input variant="deep" placeholder="Deep variant" />
        </div>
    )
}
