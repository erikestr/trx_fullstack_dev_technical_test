import React from 'react'
import NavBarItem from '../atoms/NavBarItem'

const NavPages: React.FC = () => {

    // Event handler for the Tracking button
    const handleTrackingClick = () => console.log('Tracking clicked');

    // Event handler for the Create button
    const handleCreateClick = () => console.log('Create clicked');


    return (
        <div className='w-full h-auto p-2 flex flex-col gap-4'>
            <NavBarItem text='Tracking' icon='🗺' onClick={handleTrackingClick}
                isCurrent={location.pathname === '/tracking' || location.pathname === '/'} />
            <NavBarItem text='Create Vehicle' icon='➕' onClick={handleCreateClick}
                isCurrent={location.pathname === '/create'} />
        </div>
    )
}

export default NavPages
