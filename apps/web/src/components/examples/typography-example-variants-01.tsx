import { Typography } from "@fysk/ui"

export default function TypographyVariants(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="flex flex-col gap-6" {...props}>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="lead">Lead paragraph text.</Typography>
            <Typography variant="large">Large text.</Typography>
            <Typography variant="small">Small text.</Typography>
            <Typography variant="list" data={["Item one", "Item two", "Item three"]} />
            <div className="flex items-center gap-2">
                <span>Check the</span>
                <Typography variant="inlineCode">config.ts</Typography>
                <span>file.</span>
            </div>
        </div>
    )
}
