"use client";
import { useUIStore } from '@/hooks/useUIStore';
import { useEffect } from 'react'

const PageClient = ({ slug }: { slug: string }) => {
    const { setIsSidebarOpened } = useUIStore()

    useEffect(() => {
        setIsSidebarOpened(false);
    }, [setIsSidebarOpened, slug])

    return null
}

export default PageClient
