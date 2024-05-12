import React from 'react'

interface SpinnerProps {
    size: string
    className?: string
}

const Spinner: React.FC<SpinnerProps> = ({ size, className }) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={size}
            height={size} x="0" y="0" viewBox="0 0 24 24" className='animate-spin'>
            <g>
                <path d="M12 22C6.49 22 2 17.51 2 12c0-1.87.52-3.69 1.5-5.27a1.003 1.003 0 0 1 1.7 1.06A8.008 8.008 0 0 0 4 12c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8c-.55 0-1-.45-1-1s.45-1 1-1c5.51 0 10 4.49 10 10s-4.49 10-10 10z"
                    opacity="1" className={className}></path>
            </g>
        </svg>

    )
}

export default Spinner