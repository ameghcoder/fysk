import React from 'react'
import OnThisPageSection from './onthispage-section'
import { OnThisPageHeadings } from '@/lib/mdx'

const DocsMainContentWrapper = ({ children, toc, header }: { children: React.ReactNode, toc?: OnThisPageHeadings[], header?: React.ReactNode }) => {
    return (
        <main className="flex flex-col gap-4 lg:gap-6">
            {
                header
            }
            <div className='flex justify-between w-full gap-4 md:gap-6 lg:gap-12'>
                <div className="flex-1 min-w-0 flex flex-col gap-6 w-full">
                    {children}
                </div>
                {
                    toc && <OnThisPageSection toc={toc} />
                }
            </div>
        </main>
    )
}

export default DocsMainContentWrapper

