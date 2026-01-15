import { Textarea } from "@fysk/ui"

export default function TextareaAutosize() {
    return (
        <Textarea
            variant="filled"
            placeholder="This textarea grows as you type..."
            autoSize
        />
    )
}


