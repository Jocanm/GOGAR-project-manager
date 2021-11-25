import React from 'react'
import { Outlet } from 'react-router'
import Sidebar, { SidebarDesktop } from '../components/Sidebar'

const PrivateLayout = () => {
    return (
        <div className="h-screen w-full md:flex">
            <Sidebar />
            <div className="hidden md:block min-h-full">
                <SidebarDesktop />
            </div>
            <div className="h-full w-full md:overflow-y-auto md:px-7 md:py-7">
                <Outlet />
            </div>
        </div>
    )
}

export default PrivateLayout
