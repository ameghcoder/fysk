"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/fysk/button"
import { useFyskConfig } from "@/components/fysk-provider"

// --- Context ---
type PaginationContextValue = {
    variant?: "default" | "glass" | "minimal"
    shape?: "circle" | "square" | "rounded"
    size?: "sm" | "md" | "lg"
}

const PaginationContext = React.createContext<PaginationContextValue>({
    variant: "default",
    shape: "circle",
    size: "md",
})

const usePaginationContext = () => React.useContext(PaginationContext)

// --- Components ---

const Pagination = ({
    className,
    variant = "default",
    shape = "circle",
    size = "md",
    ...props
}: React.ComponentProps<"nav"> & PaginationContextValue) => (
    <PaginationContext.Provider value={{ variant, shape, size }}>
        <nav
            role="navigation"
            aria-label="pagination"
            className={cn("mx-auto flex w-full justify-center", className)}
            {...props}
        />
    </PaginationContext.Provider>
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
    const { variant } = usePaginationContext()
    return (
        <ul
            ref={ref}
            className={cn(
                "flex flex-row items-center gap-1",
                variant === "glass" &&
                "rounded-full border border-border/50 bg-background/25 p-1 backdrop-blur-md",
                variant === "minimal" && "gap-2",
                className
            )}
            {...props}
        />
    )
})
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
    isActive?: boolean
    fixedSize?: boolean
} & React.ComponentProps<"a">

const PaginationLink = ({
    className,
    isActive,
    size: sizeProp,
    fixedSize = true, // Default to true (standard for numbers/icons)
    ...props
}: PaginationLinkProps & { size?: "sm" | "md" | "lg" | "icon" }) => {
    const { variant, shape, size: ctxSize } = usePaginationContext()
    const size = sizeProp || ctxSize

    return (
        <a
            aria-current={isActive ? "page" : undefined}
            className={cn(
                buttonVariants({
                    variant: isActive
                        ? variant === "glass"
                            ? "default"
                            : "outline"
                        : "ghost",
                    size: size === "icon" ? "icon" : size,
                }),
                // Shape overrides
                shape === "circle" && "rounded-full",
                shape === "square" && "rounded-none",
                shape === "rounded" && "rounded-md",
                // Variant overrides
                variant === "glass" &&
                isActive &&
                "bg-glass-bg/20 text-foreground backdrop-blur-sm hover:bg-glass-bg/30 border-transparent",
                variant === "glass" &&
                !isActive &&
                "text-foreground/80 hover:bg-glass-bg/10 hover:text-foreground",
                variant === "minimal" &&
                "border-0 bg-transparent hover:bg-secondary",
                variant === "minimal" &&
                isActive &&
                "font-bold text-primary bg-primary/10 hover:bg-primary/20",
                // Size overrides only if fixedSize is true
                fixedSize && size === "icon" && "h-9 w-9",
                fixedSize && size === "sm" && "h-8 w-8 p-0",
                fixedSize && size === "md" && "h-9 w-9 p-0",
                fixedSize && size === "lg" && "h-10 w-10 p-0",
                className
            )}
            {...props}
        />
    )
}
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => {
    const config = useFyskConfig()
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="md"
            fixedSize={false}
            className={cn("gap-1 pl-2.5", className)}
            {...props}
        >
            <span className="h-4 w-4 flex items-center justify-center [&_svg]:size-full">
                {config.icons?.chevronLeft}
            </span>
            <span className="hidden sm:block">Previous</span>
        </PaginationLink>
    )
}
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => {
    const config = useFyskConfig()
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="md"
            fixedSize={false}
            className={cn("gap-1 pr-2.5", className)}
            {...props}
        >
            <span className="hidden sm:block">Next</span>
            <span className="h-4 w-4 flex items-center justify-center [&_svg]:size-full">
                {config.icons?.chevronRight}
            </span>
        </PaginationLink>
    )
}
PaginationNext.displayName = "PaginationNext"

const PaginationFirst = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => {
    const config = useFyskConfig()
    return (
        <PaginationLink
            aria-label="Go to first page"
            size="icon"
            className={cn("", className)}
            {...props}
        >
            <span className="h-4 w-4 flex items-center justify-center [&_svg]:size-full">
                {config.icons?.chevronsLeft}
            </span>
        </PaginationLink>
    )
}
PaginationFirst.displayName = "PaginationFirst"

const PaginationLast = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => {
    const config = useFyskConfig()
    return (
        <PaginationLink
            aria-label="Go to last page"
            size="icon"
            className={cn("", className)}
            {...props}
        >
            <span className="h-4 w-4 flex items-center justify-center [&_svg]:size-full">
                {config.icons?.chevronsRight}
            </span>
        </PaginationLink>
    )
}
PaginationLast.displayName = "PaginationLast"

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => {
    const config = useFyskConfig()
    return (
        <span
            aria-hidden
            className={cn("flex h-9 w-9 items-center justify-center", className)}
            {...props}
        >
            <span className="h-4 w-4 flex items-center justify-center [&_svg]:size-full">
                {config.icons?.moreHorizontal}
            </span>
            <span className="sr-only">More pages</span>
        </span>
    )
}
PaginationEllipsis.displayName = "PaginationEllipsis"

// --- Stateful Pagination ---

interface StatefulPaginationProps extends Omit<React.ComponentProps<typeof Pagination>, 'onChange'> {
    total: number
    page: number
    pageSize?: number
    siblingCount?: number
    onChange?: (page: number) => void
    showFirstLast?: boolean
}

const StatefulPagination = ({
    total,
    page,
    pageSize = 10,
    siblingCount = 1,
    onChange,
    showFirstLast = false,
    ...props
}: StatefulPaginationProps) => {
    const totalPages = Math.ceil(total / pageSize)

    // Helper to generate page numbers
    const getPageNumbers = () => {
        const totalNumbers = siblingCount + 5
        const totalBlocks = totalNumbers + 2

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, page - siblingCount)
            const endPage = Math.min(totalPages - 1, page + siblingCount)
            let pages: (number | string)[] = range(startPage, endPage)

            const hasLeftSpill = startPage > 2
            const hasRightSpill = totalPages - endPage > 1
            const spillOffset = totalNumbers - (pages.length + 1)

            if (hasLeftSpill && !hasRightSpill) {
                const extraPages = range(startPage - spillOffset, startPage - 1)
                pages = ["...", ...extraPages, ...pages]
            } else if (!hasLeftSpill && hasRightSpill) {
                const extraPages = range(endPage + 1, endPage + spillOffset)
                pages = [...pages, ...extraPages, "..."]
            } else if (hasLeftSpill && hasRightSpill) {
                pages = ["...", ...pages, "..."]
            }

            return [1, ...pages, totalPages]
        }

        return range(1, totalPages)
    }

    const range = (start: number, end: number) => {
        const length = end - start + 1
        return Array.from({ length }, (_, i) => start + i)
    }

    const pages = getPageNumbers()

    return (
        <Pagination {...props}>
            <PaginationContent>
                {showFirstLast && (
                    <PaginationItem>
                        <PaginationFirst
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                onChange?.(1)
                            }}
                            aria-disabled={page === 1}
                            className={page === 1 ? "pointer-events-none opacity-50" : undefined}
                        />
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            if (page > 1) onChange?.(page - 1)
                        }}
                        aria-disabled={page === 1}
                        className={page === 1 ? "pointer-events-none opacity-50" : undefined}
                    />
                </PaginationItem>

                {pages.map((p, i) => (
                    <PaginationItem key={i}>
                        {p === "..." ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href="#"
                                isActive={page === p}
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (typeof p === "number") onChange?.(p)
                                }}
                            >
                                {p}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            if (page < totalPages) onChange?.(page + 1)
                        }}
                        aria-disabled={page === totalPages}
                        className={page === totalPages ? "pointer-events-none opacity-50" : undefined}
                    />
                </PaginationItem>

                {showFirstLast && (
                    <PaginationItem>
                        <PaginationLast
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                onChange?.(totalPages)
                            }}
                            aria-disabled={page === totalPages}
                            className={page === totalPages ? "pointer-events-none opacity-50" : undefined}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}
StatefulPagination.displayName = "StatefulPagination"

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationFirst,
    PaginationLast,
    StatefulPagination,
}

