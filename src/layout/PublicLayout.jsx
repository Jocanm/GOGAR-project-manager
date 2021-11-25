import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const PublicLayout = () => {
    return (
        <div className="w-screen h-screen grid-container index overflow-x-hidden ">
            <Navbar/>
            <main className="content h-full content"><Outlet/></main>
        </div>
    )
}

export default PublicLayout
