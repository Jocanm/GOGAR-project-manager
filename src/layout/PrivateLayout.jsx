import { useMutation } from '@apollo/client'
import ReactLoading from 'react-loading';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import SidebarMobile, { Header, SidebarDesktop } from '../components/Sidebar'
import { useAuthContext } from '../context/AuthContext'
import { REFRESCAR_TOKEN } from '../graphql/auth/mutations'
import { Toaster } from 'react-hot-toast';
import { useSidebarContext } from '../context/SidebarContext';

const PrivateLayout = () => {

    const { setToken, authToken } = useAuthContext()
    const navigate = useNavigate()
    const [refrescarToken, { data, loading, error }] = useMutation(REFRESCAR_TOKEN)

    const { show, setShow } = useSidebarContext()


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
        <div className="h-screen w-full flex">
            {/* <Sidebar /> */}
            <i
                onClick={() => setShow(!show)}
                className={`fas fa-${show ? "times" : "bars"} fixed top-4 left-4 z-50 cursor-pointer md:hidden`}></i>
            <div className="min-h-full">
                <SidebarMobile />
                <SidebarDesktop />
            </div>
            <div
                onClick={() => setShow(false)}
                className="h-full w-full md:overflow-y-auto">
                <Header />
                <div className=" px-7 py-7">
                    <Outlet />
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default PrivateLayout
