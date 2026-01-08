import { getDocData, OnThisPageHeadings } from "@/lib/mdx"
import { Typography } from "@fysk/ui";
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const doc = await getDocData(slug)

    if (!doc) {
        return {}
    }

    return {
        title: doc.meta.title,
        description: doc.meta.description,
        openGraph: {
            title: doc.meta.title,
            description: doc.meta.description,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: doc.meta.title,
            description: doc.meta.description,
        }
    }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const doc = await getDocData(slug)
    if (!doc) notFound()
    return (
        <main className="flex justify-between w-full gap-4 lg:gap-6">
            <div className="flex-1 min-w-0 space-y-8">
                <section className="space-y-2">
                    <Typography variant="h1">{doc.meta.title}</Typography>
                    <Typography variant="p" className="text-xl text-muted-foreground">{doc.meta.description}</Typography>
                </section>

                <article className="prose dark:prose-invert max-w-none w-full">
                    {doc.content}
                </article>
            </div>

            <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-20">
                    <Typography variant="h4" className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                        On This Page
                    </Typography>
                    <nav className="flex flex-col gap-2 border-l border-border pl-4">
                        {doc.toc.map((heading: OnThisPageHeadings) => (
                            <a
                                key={heading.id}
                                href={`#${heading.id}`}
                                className={cn(
                                    "text-sm transition-colors hover:text-foreground",
                                    heading.level === 2 ? "text-muted-foreground font-medium" : "text-muted-foreground/80 pl-4",
                                )}
                            >
                                {heading.text}
                            </a>
                        ))}
                    </nav>
                </div>
            </aside>
        </main>
    )
}