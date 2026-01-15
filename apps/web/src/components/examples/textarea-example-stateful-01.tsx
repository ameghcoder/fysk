import { Textarea } from "@fysk/ui"

export default function TextareaStatefulDemo() {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Textarea
                placeholder="Success state..."
                state="success"
            />
            <Textarea
                placeholder="Error state..."
                state="error"
            />
            <Textarea
                placeholder="Loading state..."
                state="loading"
            />
        </div>
    )
}
