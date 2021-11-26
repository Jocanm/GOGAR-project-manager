import { useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Sidebar, { SidebarDesktop } from '../components/Sidebar'
import { useAuthContext } from '../context/AuthContext'
import { VALIDATE_TOKEN } from '../graphql/auth/mutations'

const PrivateLayout = () => {

    const {authToken,setToken,setAuthToken} = useAuthContext()

    const [validarToken,{data,loading,error}] = useMutation(VALIDATE_TOKEN)

    useEffect(()=>{

        validarToken()

    },[])

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
