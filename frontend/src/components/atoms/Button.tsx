import React from 'react'
import Spinner from './Spinner'
interface ButtonProps {
    caption: string
    colors?: string
    isLoading?: boolean
    onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ caption, colors, isLoading = false, onClick }) => {

    const handleClick = () => {
        if (isLoading) return
        onClick()
    }

    return (
        <button className={`w-1/2 h-10 text-white rounded-lg flex justify-center items-center 
        ${colors}`} onClick={handleClick}>
            {isLoading && <Spinner size='1rem' className="fill-blue-300" />}
            {!isLoading && <p>{caption}</p>}
        </button>
    )
}

export default Button