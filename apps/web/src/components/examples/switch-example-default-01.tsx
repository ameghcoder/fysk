import { Label, Switch } from "@fysk/ui"

export default function SwitchDemo(props: React.ComponentProps<typeof Switch>) {
    return (
        <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" {...props} />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
    )
}


