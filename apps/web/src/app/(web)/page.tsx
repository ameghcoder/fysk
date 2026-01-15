
import HeroSection from "@/components/section/hero-section";
import { SectionContainerScreenAnimated } from "@/components/section/section-wrapper";
import { BentoSection } from "@/components/section/bento-section";
import { ExploreSection } from "@/components/section/explore-section";
import { ComparisonSection } from "@/components/section/comparison-section";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Fysk - Stateful Component library",
    description: "Fysk is a stateful component library that helps you build beautiful and responsive UIs with ease. Built top on ShadCN eco-system and supports ShadCN CLI to install components.",
    keywords: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Shadcn UI",
      "Component Library",
      "UI Components",
      "Stateful Components",
      "Frontend Development",
      "Design System",
      "TypeScript",
      "Radix UI"

    ]
  }
}
export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <main className="relative z-10 bg-black">
        <div className="max-w-6xl mx-auto w-full py-12 md:py-24">
          <SectionContainerScreenAnimated>
            <div className="flex flex-col gap-12 md:gap-32 px-4 md:px-8">
              <BentoSection />
              <ComparisonSection />
              <ExploreSection />
            </div>
          </SectionContainerScreenAnimated>
        </div>

        {/* Global Background Glows */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[128px] pointer-events-none" />
      </main>
    </div>
  );
}


