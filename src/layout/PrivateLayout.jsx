import { useMutation } from '@apollo/client'
import ReactLoading from 'react-loading';
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Sidebar, { Header, SidebarDesktop } from '../components/Sidebar'
import { useAuthContext } from '../context/AuthContext'
import { REFRESCAR_TOKEN } from '../graphql/auth/mutations'
import { Toaster } from 'react-hot-toast';

const PrivateLayout = () => {

    const { setToken, authToken } = useAuthContext()

    const navigate = useNavigate()

    const [refrescarToken, { data, loading, error }] = useMutation(REFRESCAR_TOKEN)

    useEffect(() => {
        refrescarToken()
    }, [refrescarToken])

    useEffect(() => {
        console.log("dm:", data)

        if (data) {
            if (data.RefrescarToken.token) {
                setToken(data.RefrescarToken.token)
            } else {
                // setToken(null)
                navigate("/auth/login")
            }
        }

    }, [data, setToken, navigate])

    if (loading) return (
        <div className="h-screen mx-auto flex items-center justify-center">
            <ReactLoading type="spin" height="10%" width="10%" />
        </div>
    )

    return (
        <div className="h-screen w-full md:flex">
            <Sidebar />
            <div className="hidden md:block min-h-full">
                <SidebarDesktop />
            </div>
            <div className="h-full w-full md:overflow-y-auto">
                <Header />
                <div className=" md:px-7 md:py-7">
                    <Outlet />
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default PrivateLayout
