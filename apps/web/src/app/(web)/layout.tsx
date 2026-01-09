import type { Metadata } from "next";
import { AestheticHeader } from "@/components/layout/header";
import GradualBlurMemo from "@/components/effects/gradual-blur";


export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Fysk - Smart Component library",
        description: "Fysk is a smart component library that helps you build beautiful and responsive UIs with ease. Built top on ShadCN eco-system and supports ShadCN CLI to install components.",
        keywords: [
            "React",
            "Next.js",
            "Tailwind CSS",
            "Shadcn UI",
            "Component Library",
            "UI Components",
            "Smart Components",
            "Frontend Development",
            "Design System",
            "TypeScript",
            "Radix UI"
        ]
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AestheticHeader />
            <div className="relative">
                {children}
            </div>
            <GradualBlurMemo
                target="page"
                position="bottom"
                height="6rem"
                strength={2}
                divCount={5}
                curve="bezier"
                exponential={true}
                opacity={1}
            />
        </>
    );
}
