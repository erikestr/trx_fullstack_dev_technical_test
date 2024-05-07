import React from 'react'
import NavPages from '../molecules/NavPages'
import NavHome from '../molecules/NavHome'

const NavBar: React.FC = () => {
    return (
        <div className='w-auto h-full flex flex-col p-4 gap-8 border-r-2 border-shade-400'>
            <NavHome />
            <NavPages />
        </div>
    )
}

export default NavBar