import { Card, CardContent, Typography } from '@fysk/ui'
import Link from 'next/link'
import { Info } from 'lucide-react'

interface PrerequisitesProps {
    /** Show a minimal one-liner instead of full card */
    minimal?: boolean
    /** Custom message override */
    message?: string
}

/**
 * Prerequisites component to show at the top of component documentation.
 * Links users to the Quick Start guide for setup instructions.
 */
export function Prerequisites({ minimal = false, message }: PrerequisitesProps) {
    const defaultMessage = "This component requires the FyskProvider."

    if (minimal) {
        return (
            <Typography className="text-sm text-muted-foreground mb-6 flex items-center gap-2 bg-warning/10 border border-warning/5 p-2 rounded-md w-fit">
                <Info className="size-4" />
                {message || defaultMessage}{" "}
                <Link href="/docs/quick-start" className="text-primary hover:underline">
                    See Quick Start →
                </Link>
            </Typography>
        )
    }

    return (
        <Card variant="glass" className="mb-6">
            <CardContent className="py-4">
                <div className="flex items-start gap-3">
                    <Info className="size-5 text-primary mt-0.5 shrink-0" />
                    <div>
                        <Typography variant="strong" className="text-sm">
                            {message || defaultMessage}
                        </Typography>
                        <Typography className="text-sm text-muted-foreground mt-1">
                            If you haven&apos;t set up Fysk yet, follow the{" "}
                            <Link href="/docs/quick-start" className="text-primary hover:underline font-medium">
                                Quick Start guide
                            </Link>{" "}
                            (2 minutes).
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Prerequisites
