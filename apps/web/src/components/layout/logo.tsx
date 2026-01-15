/* eslint-disable @next/next/no-img-element */
import React from 'react'

const LogoText = ({ className }: { className?: string }) => {
    return (
        <span className={`font-semibold text-base text-white ${className}`}>Fysk</span>
    )
};

const LogoIconPNG = ({ containerClassName, className, showText, textClassName }: { containerClassName?: string, className?: string, showText?: boolean, textClassName?: string }) => {
    return (
        <div className={`flex items-center gap-1 bg-black rounded-sm p-1 px-2 ${containerClassName}`}>
            <img src="/assets/logo-png.png" alt="Fysk Logo" className={`size-4 object-contain aspect-square ${className}`} />
            {
                showText && <LogoText className={textClassName} />
            }
        </div>
    )
}

const LogoIconSVG = ({ containerClassName, className, showText, textClassName }: { containerClassName?: string, className?: string, showText?: boolean, textClassName?: string }) => {
    return (
        <div className={`flex items-center gap-1 bg-black rounded-sm p-1 px-2 ${containerClassName}`}>
            <img src="/assets/icon-svg.svg" alt="Fysk Logo" className={`size-4 object-contain aspect-square ${className}`} />
            {
                showText && <LogoText className={textClassName} />
            }
        </div>
    )
}

export {
    LogoIconSVG,
    LogoIconPNG
}

