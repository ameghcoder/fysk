'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger, Button, ScrollArea, Select, SelectItem, Label, Switch, Input, SelectTrigger, SelectValue, SelectContent, Card, CardHeader, CardFooter, CardContent } from '@fysk/ui'
import { Check, Copy, Settings2, X, RotateCcw } from 'lucide-react'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodeBlock from './code-block'
import { cn } from '@/lib/utils'

export type PropControl =
    | { type: "text"; default: string }
    | { type: "number"; default: number }
    | { type: "select"; options: string[]; default: string }
    | { type: "boolean"; default: boolean };

// Context for passing preview props to nested components
const PreviewContext = React.createContext<Record<string, string | number | boolean>>({})
export const usePreview = () => React.useContext(PreviewContext)

export interface ComponentPreviewClientProps {
    children: React.ReactNode;
    code: string;
    showPropOpener?: boolean;
    controls?: Record<string, PropControl>;
    name?: string;
    language?: string;
}

export const ComponentPreviewClient = ({
    children,
    code = "",
    showPropOpener = true,
    controls = {},
    name = "Component",
    language = "TypeScript / React"
}: ComponentPreviewClientProps) => {
    const [copied, setCopied] = useState(false)
    const [isPropsOpen, setIsPropsOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("preview")

    const [propsState, setPropsState] = useState<Record<string, string | boolean | number>>(() => {
        const initialState: Record<string, string | boolean | number> = {}
        for (const key in controls) {
            initialState[key] = controls[key].default
        }
        return initialState
    })

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const resetProps = () => {
        const initialState: Record<string, string | boolean | number> = {}
        for (const key in controls) {
            initialState[key] = controls[key].default
        }
        setPropsState(initialState)
    }

    const previewComponent = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, propsState as React.Attributes)
        }
        return child
    });

    const updateProp = (key: string, value: string | boolean | number) => {
        setPropsState((prev) => ({ ...prev, [key]: value }))
    }

    const hasControls = Object.keys(controls).length > 0;

    return (
        <div className='group relative w-full flex flex-col gap-4 mt-6 mb-10'>
            <Tabs
                defaultValue="preview"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
            >
                <div className="flex items-center justify-between pb-2">
                    <TabsList className='rounded-xl'>
                        <TabsTrigger
                            value="preview"
                        >
                            Preview
                        </TabsTrigger>
                        <TabsTrigger
                            value="code"
                        >
                            Code
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                        {activeTab === "preview" && hasControls && showPropOpener && (
                            <Button
                                variant="secondary"
                                size="sm"
                                className={cn(
                                    "h-8 px-3 gap-2 border-border/50 transition-all",
                                    isPropsOpen && "bg-accent text-accent-foreground border-accent"
                                )}
                                onClick={() => setIsPropsOpen(!isPropsOpen)}
                            >
                                <Settings2 className={cn("h-3.5 w-3.5 transition-transform duration-500", isPropsOpen && "rotate-90")} />
                                <span className="hidden sm:inline">Controls</span>
                            </Button>
                        )}
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 px-3 gap-2 border-border/50 hover:bg-muted/50"
                            onClick={copyToClipboard}
                        >
                            {copied ? <Check className="h-3.5 w-3.5 text-[#22c55e]" /> : <Copy className="h-3.5 w-3.5" />}
                            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                        </Button>
                    </div>
                </div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        {activeTab === "preview" ? (
                            <TabsContent value="preview" key="preview" className="mt-0 focus-visible:outline-none" forceMount>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.995 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.995 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative flex flex-col min-h-[450px] overflow-hidden border border-border rounded-2xl shadow-sm bg-background"
                                >
                                    {/* MAC Style Header */}
                                    <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30 backdrop-blur-md">
                                        <div className="flex gap-2">
                                            <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] shadow-inner" />
                                            <div className="w-3.5 h-3.5 rounded-full bg-[#FEBC2E] shadow-inner" />
                                            <div className="w-3.5 h-3.5 rounded-full bg-[#28C840] shadow-inner" />
                                        </div>
                                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] font-medium text-muted-foreground uppercase tracking-widest pointer-events-none">
                                            {name}
                                        </div>
                                        <div className="flex items-center text-xs text-muted-foreground font-mono">
                                            {language.split(' / ')[0]}
                                        </div>
                                    </div>

                                    {/* Canvas Area */}
                                    <div className="relative flex-1 flex items-center justify-center p-8 md:p-14 overflow-hidden bg-background/50 backdrop-blur-sm">
                                        {/* Dot Grid Background */}
                                        <div
                                            className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.07]"
                                            style={{
                                                backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                                                backgroundSize: '18px 18px'
                                            }}
                                        />

                                        <div className="relative z-10 w-full flex justify-center animate-in fade-in zoom-in-95 duration-500">
                                            <PreviewContext.Provider value={propsState}>
                                                {previewComponent || <div className="text-muted-foreground italic">No preview content</div>}
                                            </PreviewContext.Provider>
                                        </div>

                                        {/* Floating Inspector (Props) */}
                                        <AnimatePresence>
                                            {isPropsOpen && hasControls && (
                                                <>
                                                    {/* Mobile Overlay */}
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        onClick={() => setIsPropsOpen(false)}
                                                        className="absolute inset-0 z-20 bg-background/20 backdrop-blur-[2px] sm:hidden"
                                                    />

                                                    <motion.div
                                                        initial={{ x: 300, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        exit={{ x: 300, opacity: 0 }}
                                                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                                        className="absolute top-4 right-4 bottom-4 w-72 z-30 flex flex-col rounded-xl border border-border shadow-2xl bg-background/80 backdrop-blur-xl overflow-hidden"
                                                    >
                                                        <Card className='p-0!' variant={'default'}>
                                                            <CardHeader className='p-0!'>
                                                                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                                                                    <div className="flex items-center gap-2">
                                                                        <Settings2 className="h-4 w-4 text-primary" />
                                                                        <span className="text-xs font-semibold uppercase tracking-wider">Inspector</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-7 w-7 rounded-md hover:bg-background"
                                                                            onClick={resetProps}
                                                                        >
                                                                            <RotateCcw className="h-3.5 w-3.5" />
                                                                        </Button>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-7 w-7 rounded-md hover:bg-destructive/10 hover:text-destructive"
                                                                            onClick={() => setIsPropsOpen(false)}
                                                                        >
                                                                            <X className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </CardHeader>
                                                            <CardContent className="px-0! flex flex-col h-full pb-14!">
                                                                <ScrollArea className="flex-1">
                                                                    <div className="p-5 space-y-6">
                                                                        {Object.entries(controls).map(([key, config]) => (
                                                                            <div key={key} className="space-y-2.5">
                                                                                <div className="flex items-center justify-between">
                                                                                    <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{key}</Label>
                                                                                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
                                                                                        {typeof propsState[key] === 'boolean' ? (propsState[key] ? 'TRUE' : 'FALSE') : propsState[key]}
                                                                                    </span>
                                                                                </div>

                                                                                {config.type === "select" && (
                                                                                    <Select
                                                                                        value={propsState[key] as string}
                                                                                        onValueChange={(e) => updateProp(key, e)}
                                                                                    >
                                                                                        <SelectTrigger className="h-9 text-xs bg-background/50 border-border/50">
                                                                                            <SelectValue placeholder={`Select ${key}`} />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent className="backdrop-blur-xl bg-background/95">
                                                                                            {config.options.map(opt => (
                                                                                                <SelectItem key={opt} value={opt} className="text-xs">
                                                                                                    {opt}
                                                                                                </SelectItem>
                                                                                            ))}
                                                                                        </SelectContent>
                                                                                    </Select>
                                                                                )}

                                                                                {config.type === "boolean" && (
                                                                                    <div className="flex items-center space-x-2">
                                                                                        <Switch
                                                                                            checked={propsState[key] as boolean}
                                                                                            onCheckedChange={(checked) => updateProp(key, checked)}
                                                                                        />
                                                                                    </div>
                                                                                )}

                                                                                {config.type === "text" && (
                                                                                    <Input
                                                                                        type="text"
                                                                                        className="h-9 text-xs bg-background/50 border-border/50"
                                                                                        value={propsState[key] as string}
                                                                                        onChange={(e) => updateProp(key, e.target.value)}
                                                                                    />
                                                                                )}

                                                                                {config.type === "number" && (
                                                                                    <Input
                                                                                        type="number"
                                                                                        className="h-9 text-xs bg-background/50 border-border/50"
                                                                                        value={propsState[key] as number}
                                                                                        onChange={(e) => updateProp(key, parseInt(e.target.value))}
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </ScrollArea>
                                                            </CardContent>
                                                            <CardFooter>
                                                                <div className="px-5 py-3 border-t border-border bg-muted/10">
                                                                    <p className="text-xs text-muted-foreground leading-relaxed italic text-center">
                                                                        Changes are reflected in real-time above.
                                                                    </p>
                                                                </div>
                                                            </CardFooter>
                                                        </Card>
                                                    </motion.div>
                                                </>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            </TabsContent>
                        ) : (
                            <TabsContent value="code" key="code" className="mt-0 focus-visible:outline-none" forceMount>
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col border border-border rounded-2xl overflow-hidden bg-background"
                                >
                                    <div className="relative flex-1 bg-background/50 backdrop-blur-sm">
                                        <CodeBlock code={code} language={language} variant="ghost" className="my-0!" />
                                    </div>
                                </motion.div>
                            </TabsContent>
                        )}
                    </AnimatePresence>
                </div>
            </Tabs>
        </div>
    )
}
