import React from 'react'

const CustomBullet = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm'>
            {children}
        </div>
    )
}

export default CustomBullet