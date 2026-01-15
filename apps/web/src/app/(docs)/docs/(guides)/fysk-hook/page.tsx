import { Typography } from '@fysk/ui'
import CodeBlock from '@/components/layout/code-block'
import SectionContainerWrapper from '@/components/section/section-wrapper'
import { Metadata } from 'next'
import React from 'react'
import DocsMainContentWrapper from '@/components/section/docs-main-content-wrapper'
import { OnThisPageHeadings } from '@/lib/mdx'

export const metadata: Metadata = {
    title: "useFyskAnimation Hook - Fysk",
    description: "Centralized animation control hook for consistent, professional animations across all Fysk components.",
}

const toc: OnThisPageHeadings[] = [
    { level: 2, text: 'About useFyskAnimation', id: 'about-usefyskanimation' },
    { level: 2, text: 'Why Centralized Animations?', id: 'why-centralized-animations' },
    { level: 2, text: 'Usage', id: 'usage' },
    { level: 2, text: 'Return Values', id: 'return-values' },
    { level: 3, text: 'Transitions', id: 'transitions' },
    { level: 3, text: 'Variants', id: 'variants' },
    { level: 2, text: 'Configuration', id: 'configuration' },
    { level: 2, text: 'Example: Custom Component', id: 'example-custom-component' },
]

const basicUsageCode = `import { useFyskAnimation } from "@fysk/ui"

function MyComponent() {
  const { 
    isEnabled, 
    motion, 
    AnimatePresence,
    transitions,
    variants 
  } = useFyskAnimation()
  
  return (
    <motion.div
      {...(isEnabled ? {
        layout: true,
        transition: transitions?.layout
      } : {})}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={someKey}
          {...(isEnabled && variants ? variants.fadeSlide : {})}
        >
          Content
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )
}`

const returnValuesCode = `const {
  // Core
  isEnabled,       // boolean - Are animations enabled?
  motion,          // The motion object (or fallback HTML tags)
  AnimatePresence, // AnimatePresence component (or React.Fragment)
  config,          // Full FyskAnimationConfig object
  
  // Pre-computed objects (null if disabled)
  transitions,     // Pre-configured transition presets
  variants,        // Pre-configured animation variants
  
  // Direct access to config values
  durations,       // { instant, fast, normal, slow, layout }
  easings,         // { enter, exit, layout, hover, linear }
  effects,         // { blur, blurAmount, scale, scaleAmount, slide, slideDistance }
} = useFyskAnimation()`

const transitionsCode = `// Available transitions:
transitions.layout      // For size/position changes
transitions.enter       // For entering elements
transitions.exit        // For exiting elements
transitions.hover       // For hover micro-interactions
transitions.content     // For content swapping (includes nested layout)
transitions.linear      // For constant animations (spinners)
transitions.layoutEnter // Combined layout + enter

// Usage example:
<motion.div
  layout
  transition={transitions?.layout}
>
  ...
</motion.div>`

const variantsCode = `// Available variants:
variants.fadeSlide  // Fade + blur/scale/slide (based on effects config)
variants.fade       // Simple fade only
variants.iconPop    // Scale + rotate pop for icons
variants.overlay    // Overlay fade in/out
variants.slideUp    // Slide up from bottom
variants.scaleIn    // Scale in/out (modals, popovers)

// Usage example:
<AnimatePresence mode="wait">
  <motion.div
    key={state}
    {...(isEnabled && variants ? variants.fadeSlide : {})}
  >
    Content
  </motion.div>
</AnimatePresence>`

const configurationCode = `// In your providers.tsx
<FyskProvider
  animations={{
    enabled: true,
    motion: motion,
    AnimatePresence: AnimatePresence,
    
    // Customize durations (in seconds)
    durations: {
      instant: 0.1,   // 100ms - micro-interactions
      fast: 0.15,     // 150ms - quick feedback
      normal: 0.2,    // 200ms - standard transitions
      slow: 0.3,      // 300ms - deliberate animations
      layout: 0.4,    // 400ms - size/position changes
    },
    
    // Customize easings (based on "The Easing Blueprint")
    easings: {
      enter: "easeOut",    // Entering elements (responsive)
      exit: "easeOut",     // Exiting elements
      layout: "easeInOut", // Size changes (natural)
      hover: "easeOut",    // Hover interactions
      linear: "linear",    // Constant animations
    },
    
    // Customize visual effects
    effects: {
      blur: true,          // Enable blur on transitions
      blurAmount: 4,       // Blur intensity (px)
      scale: true,         // Enable scale on transitions
      scaleAmount: 0.95,   // Scale amount
      slide: true,         // Enable slide effect
      slideDistance: 10,   // Slide distance (px)
    },
  }}
>
  {children}
</FyskProvider>`

const customComponentCode = `"use client"
import { useFyskAnimation } from "@fysk/ui"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  state?: "idle" | "loading" | "success"
  className?: string
}

export function AnimatedCard({ 
  children, 
  state = "idle",
  className 
}: AnimatedCardProps) {
  const { 
    isEnabled, 
    motion, 
    AnimatePresence,
    transitions,
    variants 
  } = useFyskAnimation()

  return (
    <motion.div
      {...(isEnabled ? {
        layout: true,
        transition: transitions?.layout
      } : {})}
      className={cn(
        "rounded-lg border bg-card p-4",
        state === "success" && "border-green-500",
        className
      )}
    >
      <AnimatePresence {...(isEnabled ? { mode: "wait" } : {})}>
        <motion.div
          key={state}
          {...(isEnabled && variants ? variants.fadeSlide : {})}
        >
          {state === "loading" ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              Loading...
            </div>
          ) : state === "success" ? (
            <div className="flex items-center gap-2 text-green-600">
              ✓ Success!
            </div>
          ) : (
            children
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}`

const FyskHookPage = () => {
    return (
        <DocsMainContentWrapper toc={toc}>
            <div>
                <Typography variant="h1" className="mb-4">useFyskAnimation Hook</Typography>
                <Typography variant="lead">
                    The centralized animation control system for Fysk. Provides pre-computed transitions and variants for consistent, professional animations across all components.
                </Typography>
            </div>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="about-usefyskanimation">About useFyskAnimation</Typography>
                <Typography className="mb-4">
                    The <Typography variant="inlineCode">useFyskAnimation</Typography> hook is the bridge between your animation configuration (set in <Typography variant="inlineCode">FyskProvider</Typography>) and individual components. It provides:
                </Typography>
                <Typography variant={"list"} data={[
                    <Typography key="motion-access"><Typography variant={"strong"}>Motion Access:</Typography> Returns the framer-motion <Typography variant="inlineCode">motion</Typography> object or fallback HTML elements when animations are disabled.</Typography>,
                    <Typography key="transitions"><Typography variant={"strong"}>Pre-computed Transitions:</Typography> Ready-to-use transition objects based on your duration and easing configuration.</Typography>,
                    <Typography key="variants"><Typography variant={"strong"}>Pre-computed Variants:</Typography> Animation variants (fadeSlide, iconPop, scaleIn, etc.) that respect your effects configuration.</Typography>,
                    <Typography key="conditional"><Typography variant={"strong"}>Conditional Logic:</Typography> Automatically handles the enabled/disabled state so components gracefully degrade.</Typography>,
                ]} />
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="why-centralized-animations">Why Centralized Animations?</Typography>
                <Typography className="mb-4">
                    Without centralization, animation values are scattered across components—a <Typography variant="inlineCode">200ms</Typography> here, an <Typography variant="inlineCode">easeOut</Typography> there. This leads to:
                </Typography>
                <Typography variant="list" data={[
                    <Typography key="inconsistency"><Typography variant="strong">Inconsistency:</Typography> Different components feel disconnected because of varying timings.</Typography>,
                    <Typography key="maintenance"><Typography variant="strong">Maintenance Pain:</Typography> Changing the &quot;feel&quot; of your app requires editing dozens of files.</Typography>,
                    <Typography key="bundle"><Typography variant="strong">Bundle Bloat:</Typography> framer-motion is imported everywhere, even when animations might be disabled.</Typography>,
                ]} />
                <Typography className="mt-4 mb-4">
                    The <Typography variant="inlineCode">useFyskAnimation</Typography> hook solves all of these by:
                </Typography>
                <Typography variant="list" data={[
                    <Typography key="single-source"><Typography variant="strong">Single Source of Truth:</Typography> All timing and easing values come from one configuration.</Typography>,
                    <Typography key="instant-updates"><Typography variant="strong">Instant Global Updates:</Typography> Tweak <Typography variant="inlineCode">durations.normal</Typography> once, and every component updates.</Typography>,
                    <Typography key="tree-shake"><Typography variant="strong">Tree-Shakeable:</Typography> When <Typography variant="inlineCode">enabled: false</Typography>, framer-motion is never imported by components.</Typography>,
                ]} />
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="usage">Usage</Typography>
                <Typography className="mb-4">
                    Import the hook and destructure what you need:
                </Typography>
                <CodeBlock
                    language="typescript"
                    code={basicUsageCode}
                />
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="return-values">Return Values</Typography>
                <Typography className="mb-4">
                    The hook returns an object with everything you need for animations:
                </Typography>
                <CodeBlock
                    language="typescript"
                    code={returnValuesCode}
                />
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h3" className="mb-4" id="transitions">Transitions</Typography>
                <Typography className="mb-4">
                    Pre-computed transition objects based on your configuration. Each is optimized for its specific use case:
                </Typography>
                <CodeBlock
                    language="typescript"
                    code={transitionsCode}
                />
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h3" className="mb-4" id="variants">Variants</Typography>
                <Typography className="mb-4">
                    Pre-computed animation variants that respect your <Typography variant="inlineCode">effects</Typography> configuration:
                </Typography>
                <CodeBlock
                    language="typescript"
                    code={variantsCode}
                />
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="configuration">Configuration</Typography>
                <Typography className="mb-4">
                    Animation behavior is configured through <Typography variant="inlineCode">FyskProvider</Typography>. The hook reads this configuration and computes transitions/variants accordingly:
                </Typography>
                <CodeBlock
                    language="typescript"
                    code={configurationCode}
                />
                <Typography className="mt-4">
                    All values have sensible defaults based on <a referrerPolicy='no-referrer' href="https://animations.dev/learn/animation-theory/the-easing-blueprint">The Easing Blueprint</a>, so you can start with just <Typography variant="inlineCode">{`{ enabled: true, motion, AnimatePresence }`}</Typography>.
                </Typography>
            </SectionContainerWrapper>

            <SectionContainerWrapper>
                <Typography variant="h2" className="mb-4" id="example-custom-component">Example: Custom Component</Typography>
                <Typography className="mb-4">
                    Here&apos;s how to build a custom animated component using the hook:
                </Typography>
                <CodeBlock
                    language="typescript"
                    code={customComponentCode}
                />
                <Typography className="mt-4">
                    This component will animate smoothly when animations are enabled, and fall back to instant state changes when disabled—no extra code required.
                </Typography>
            </SectionContainerWrapper>
        </DocsMainContentWrapper>
    )
}

export default FyskHookPage
