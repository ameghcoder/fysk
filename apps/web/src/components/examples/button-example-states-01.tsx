import { Button } from "@fysk/ui"

export default function ButtonStates() {
    return (
        <div className="flex flex-wrap gap-4">
            <Button state="loading" loadingText="Saving...">Save</Button>
            <Button state="success" successText="Saved!">Save</Button>
            <Button state="error" errorText="Failed!">Save</Button>
        </div>
    )
}
