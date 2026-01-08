import { OTPInput } from "@fysk/ui"

export default function OTPInputVariants() {
    return (
        <div className="flex flex-col gap-8">
            <div className="space-y-2">
                <p className="text-sm font-medium">Default</p>
                <OTPInput length={4} />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Condensed</p>
                <OTPInput variant="condensed" length={6} />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Underline</p>
                <OTPInput variant="underline" length={4} />
            </div>
        </div>
    )
}
