import { OnThisPageHeadings } from '@/lib/mdx'
import { cn } from '@/lib/utils'
import { Typography } from '@fysk/ui'
import Link from 'next/link'

const OnThisPageSection = ({ toc }: { toc: OnThisPageHeadings[] }) => {
    return (
        <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20">
                <Typography variant="h4" className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                    On This Page
                </Typography>
                <nav className="flex flex-col gap-2 border-l border-border pl-4">
                    {toc.map((heading: OnThisPageHeadings) => (
                        <Link
                            key={heading.id}
                            href={`#${heading.id}`}
                            className={cn(
                                "text-sm transition-colors hover:text-foreground",
                                heading.level === 2 ? "text-muted-foreground font-medium" : "text-muted-foreground/80 pl-4",
                            )}
                        >
                            {heading.text}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    )
}

export default OnThisPageSection

