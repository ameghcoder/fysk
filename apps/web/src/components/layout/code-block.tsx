'use client'
import { ScrollArea, Button } from '@fysk/ui'
import { useTheme } from 'next-themes'
import { Highlight, themes } from 'prism-react-renderer'
import React, { useEffect, useEffectEvent, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react'

interface CodeBlockProps {
    code: string;
    language?: string;
    variant?: "default" | "ghost";
    className?: string;
}

const CodeBlock = ({ code, language = "TypeScript / React", variant = "default", className }: CodeBlockProps) => {
    const { theme } = useTheme()
    const [currentTheme, setCurrentTheme] = React.useState(themes.github)
    const [copied, setCopied] = React.useState(false)
    const [showExpander, setShowExpander] = React.useState(false)
    const [isExpanded, setIsExpanded] = React.useState(false);
    const CodeBlockRef = useRef<HTMLPreElement>(null);
    const CodeBlockParentRef = useRef<HTMLDivElement>(null);

    const updateExpanderValue = useEffectEvent(() => {
        if (CodeBlockRef.current && CodeBlockParentRef.current) {
            const parent_height = CodeBlockParentRef.current.clientHeight
            const height = CodeBlockRef.current.clientHeight
            if (height > parent_height) {
                setShowExpander(true)
            }
        }
    })

    React.useEffect(() => {
        setCurrentTheme(theme === "dark" ? themes.duotoneDark : themes.github)
    }, [theme])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    useEffect(() => {
        updateExpanderValue()
    }, [CodeBlockRef])

    return (
        <div ref={CodeBlockParentRef} className={cn(
            "w-full relative group/code overflow-hidden flex flex-col mb-6 md:mb-12 mt-2 md:mt-4 h-full",
            variant === "default" ? "border border-border rounded-2xl shadow-sm bg-background" : "rounded-xl",
            className,
            isExpanded ? "max-h-full" : "max-h-[450px]"
        )}>
            {variant === "default" && (
                <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30 backdrop-blur-md shrink-0">
                    <div className="flex gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] shadow-inner" />
                        <div className="w-3.5 h-3.5 rounded-full bg-[#FEBC2E] shadow-inner" />
                        <div className="w-3.5 h-3.5 rounded-full bg-[#28C840] shadow-inner" />
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] font-medium text-muted-foreground uppercase tracking-widest pointer-events-none">
                        {language}
                    </div>

                    <div className="flex items-center text-xs text-muted-foreground font-mono">
                        {language.split(' / ')[0]}
                    </div>
                </div>
            )}
            <ScrollArea orientation='both' className={cn("flex-1 min-h-0 h-full w-full relative",
                variant === "default" ? "bg-background/50 backdrop-blur-sm" : "bg-transparent")}>
                {/* Subtle Dot Grid Background */}
                <div
                    className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                        backgroundSize: '24px 24px'
                    }}
                />

                <div className="absolute top-3 right-3 z-20">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground transition-all hover:bg-background/80 hover:backdrop-blur-sm"
                        onClick={copyToClipboard}
                    >
                        {copied ? <Check className="h-4 w-4 text-[#22c55e]" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>

                <Highlight
                    theme={currentTheme}
                    code={code.trim()}
                    language={
                        language.toLowerCase().includes('typescript') ||
                            language.toLowerCase().includes('react') ||
                            language.toLowerCase().includes('tsx')
                            ? 'tsx' : language.toLowerCase()
                    }
                >
                    {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
                        <pre ref={CodeBlockRef} className={cn(highlightClassName, "text-sm font-mono py-4 bg-transparent! whitespace-pre-wrap")} style={style}>
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })} className='bg-transparent! px-5 flex gap-5'>
                                    <span className="inline-block w-4 select-none text-muted-foreground/30 text-right text-[11px] mt-0.5">{i + 1}</span>
                                    <div className="flex-1">
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token })} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>


                {
                    showExpander && <div className="w-full absolute bottom-0 left-0 h-10 flex items-center justify-center backdrop-blur-sm bg-linear-to-b from-transparent/50 to-background">
                        <Button
                            variant="ghost"
                            className="w-full! flex items-center justify-end text-foreground transition-all hover:bg-background/80 hover:backdrop-blur-sm"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? "Hide Code" : "Show Code"}
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </div>
                }
            </ScrollArea>
        </div>
    )
}

export default CodeBlock
