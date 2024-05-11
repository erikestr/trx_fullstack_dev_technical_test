import React from 'react'
import NavBarItem from '../atoms/NavBarItem'
import { useLocation, useNavigate } from 'react-router-dom'

const NavPages: React.FC = () => {
    /** Navigate hook declaration */
    const navigate = useNavigate()

    /** Location hook declaration */
    const location = useLocation()

    /** Navigation handler, redirect to tracking page */
    const handleTrackingClick = () => navigate('/tracking')

    /** Navigation handler, redirect to create vehicle page */
    const handleCreateClick = () => navigate('/create')

    /** Navigation handler, redirect to vehicle detail page */
    const handleDetailClick = () => navigate('/detail')

    return (
        <div className='w-full h-auto p-2 flex flex-col gap-4'>
            <NavBarItem text='Tracking' icon='🗺' onClick={handleTrackingClick}
                isCurrent={location.pathname === '/tracking' || location.pathname === '/'} />
            <NavBarItem text='Create Vehicle' icon='➕' onClick={handleCreateClick}
                isCurrent={location.pathname === '/create'} />
            <NavBarItem text='Vehicle Detail' icon='📃' onClick={handleDetailClick}
                isCurrent={location.pathname === '/detail'} />
        </div>
    )
}

export default NavPages
