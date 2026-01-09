import { getDocData } from "@/lib/mdx"
import { Typography } from "@fysk/ui";
import { notFound } from "next/navigation"
import { Metadata } from "next";
import PageClient from "./pageClient";
import DocsMainContentWrapper from "@/components/section/docs-main-content-wrapper";

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
        <>
            <PageClient slug={slug} />
            <DocsMainContentWrapper toc={doc.toc}>
                <section className="space-y-2">
                    <Typography variant="h1">{doc.meta.title}</Typography>
                    <Typography variant="p" className="text-xl text-muted-foreground">{doc.meta.description}</Typography>
                </section>

                <article className="prose dark:prose-invert max-w-none w-full">
                    {doc.content}
                </article>
            </DocsMainContentWrapper>
        </>
    )
}