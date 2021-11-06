import React from 'react'
import Navbar from '../components/Navbar'

const PublicLayout = ({children}) => {
    return (
        <div className="w-screen h-screen grid-container index overflow-x-hidden ">
            <Navbar/>
            <main className="content h-full content">{children}</main>
        </div>
    )
}

export default PublicLayout
