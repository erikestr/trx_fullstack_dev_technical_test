import React from 'react'

interface NavBarItemProps {
    icon: string
    text: string
    onClick: () => void
    isCurrent: boolean
}

const NavBarItem: React.FC<NavBarItemProps> = ({ icon, text, onClick, isCurrent }) => {

    return (
        <div className={`w-full h-10 rounded-xl
        border-base flex flex-row items-center gap-2
       hover:border-2 active:bg-base active:text-gray-shade-300 cursor-pointer
       ${isCurrent ? 'bg-base text-gray-shade-400 font-bold ' : ''}`}
            onClick={onClick}>
            <span className='pl-2'>{icon}</span>
            <span className='text'>{text}</span>
        </div>
    )
}

export default NavBarItem
