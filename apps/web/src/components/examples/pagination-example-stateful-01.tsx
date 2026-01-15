"use client"

import * as React from "react"
import { StatefulPagination } from "@fysk/ui"

export default function StatefulPaginationDemo() {
    const [page, setPage] = React.useState(1)

    return (
        <div className="flex flex-col gap-8 w-full">
            <StatefulPagination
                total={100}
                page={page}
                onChange={setPage}
                showFirstLast
            />

            <StatefulPagination
                variant="glass"
                total={100}
                page={page}
                onChange={setPage}
            />

            <StatefulPagination
                variant="minimal"
                total={100}
                page={page}
                onChange={setPage}
            />
        </div>
    )
}


