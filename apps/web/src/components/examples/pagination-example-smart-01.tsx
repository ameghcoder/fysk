"use client"

import * as React from "react"
import { SmartPagination } from "@fysk/ui"

export default function SmartPaginationDemo() {
    const [page, setPage] = React.useState(1)

    return (
        <div className="flex flex-col gap-8 w-full">
            <SmartPagination
                total={100}
                page={page}
                onChange={setPage}
                showFirstLast
            />

            <SmartPagination
                variant="glass"
                total={100}
                page={page}
                onChange={setPage}
            />

            <SmartPagination
                variant="minimal"
                total={100}
                page={page}
                onChange={setPage}
            />
        </div>
    )
}
