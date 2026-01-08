"use client"
import * as React from "react"
import { Check, AlertCircle, AlertTriangle, Info, Loader, ChevronDown, ChevronUp, X } from "lucide-react"

export type FyskIconPosition = "start" | "end"

export interface FyskIcons {
    loading?: React.ReactNode
    success?: React.ReactNode
    error?: React.ReactNode
    warning?: React.ReactNode
    info?: React.ReactNode,
    chevronDown?: React.ReactNode,
    chevronUp?: React.ReactNode,
    close?: React.ReactNode,
}

export interface FyskConfig {
    icons?: FyskIcons
    iconPosition?: FyskIconPosition
}

const defaultIcons: Required<FyskIcons> = {
    loading: <Loader className="animate-spin" />,
    success: <Check />,
    error: <AlertCircle />,
    warning: <AlertTriangle />,
    info: <Info />,
    chevronDown: <ChevronDown />,
    chevronUp: <ChevronUp />,
    close: <X />
}

const FyskContext = React.createContext<FyskConfig>({
    icons: defaultIcons,
    iconPosition: "start",
})

export function useFyskConfig() {
    return React.useContext(FyskContext)
}

export interface FyskProviderProps extends FyskConfig {
    children: React.ReactNode
}

export function FyskProvider({
    children,
    icons,
    iconPosition = "start",
}: FyskProviderProps) {
    const value = React.useMemo(
        () => ({
            icons: { ...defaultIcons, ...icons },
            iconPosition,
        }),
        [icons, iconPosition]
    )

    return <FyskContext.Provider value={value}>{children}</FyskContext.Provider>
}
