'use client';
import { Button, Typography } from "@fysk/ui";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const HeroSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  const stretchIn: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.8 },
    },
  };
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      className="relative h-screen w-full overflow-hidden bg-black text-white selection:bg-orange-500/30"
    >
      {/* Background Image Layer */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          className="w-full h-full object-cover"
          src="/assets/astronaut-finally-got.webp"
          alt="Hero section background"
          fill
          priority
          unoptimized
        />
        {/* Subtle Color Grading Overlay */}
        <div className="absolute inset-0 bg-[#B35124]/10 mix-blend-overlay" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-black/20 to-black/80" />
      </motion.div>

      {/* Film Grain/Noise Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.15] mix-blend-soft-light shadow-inner overflow-hidden">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Glowing Laser Effect */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-[28%] -left-[10%] w-[120%] h-[2px] z-20 rotate-[-4deg] pointer-events-none"
      >
        <div className="w-full h-full bg-linear-to-r from-transparent via-gray-500/50 to-transparent blur-[1px]" />
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-gray-500/50 to-transparent blur-sm" />
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        variants={containerVariants}
        className="relative z-30 h-full flex flex-col justify-end px-8 md:px-12 pb-12 lg:pb-16"
      >
        {/* Hero Typography */}
        <div className="mb-10 max-w-7xl">
          <motion.div variants={fadeInUp}>
            <Typography variant="h1" className="font-suse-mono font-bold tracking-tight mb-2 selection:bg-white selection:text-black leading-[1.1]">
              Fysk.
            </Typography>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Typography variant="h2" className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white/30 selection:bg-white selection:text-black/30 leading-[1.1]">
              Stateful components with <br /> beautiful micro-interactions.
            </Typography>
          </motion.div>
        </div>

        {/* Thin Separator Line */}
        <motion.div variants={stretchIn} className="w-full h-px bg-white/10 mb-8" />

        {/* Bottom Grid Info */}
        <motion.div variants={fadeInUp} className="flex lg:flex-row flex-col justify-between gap-8 items-start">
          {/* Left Tagline */}
          <div className="lg:max-w-xl">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 leading-relaxed ">
              One `state` prop handles loading, success, and error — with smooth animations. Zero boilerplate. Built on Radix UI and Tailwind CSS.
            </p>
          </div>

          {/* Right Blocks */}
          <div className="flex items-center gap-4">
            <Button variant={'link'} asChild>
              <Link href="/docs">Get Started</Link>
            </Button>
            <Button variant={'link'} asChild>
              <Link href="/docs/explore">Explore Components</Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute top-1/2 left-0 w-8 h-px bg-white/10"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute top-1/2 right-0 w-8 h-px bg-white/10"
      />
    </motion.main>
  )
}

export default HeroSection

