
import FooterSection from "@/components/layout/footer";
import HeroSection from "@/components/section/hero-section";
import { SectionContainerScreenAnimated } from "@/components/section/section-wrapper";
import { BentoSection } from "@/components/section/bento-section";
import { ExploreSection } from "@/components/section/explore-section";
import { Metadata } from "next";


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
export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <main className="max-w-6xl mx-auto w-full py-6 md:py-12 lg:py-24">
        <SectionContainerScreenAnimated>
          <div className="flex flex-col gap-12 md:gap-24 px-4 md:px-8">
            <BentoSection />
            <ExploreSection />
          </div>
        </SectionContainerScreenAnimated>
      </main>
      <FooterSection />
    </div>
  );
}
