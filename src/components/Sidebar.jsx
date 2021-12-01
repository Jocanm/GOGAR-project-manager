import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import PrivateComponent from './PrivateComponent'

const SidebarMobile = () => {

    const [show, setShow] = useState(false)

    return (
        <div className="md:hidden">
            <header className={`h-20 bg-custom-second px-6 py-4 shadow-xl ${show && "bg-custom-fourth"} transicion`}>
                <ul className="flex justify-between items-center h-full">
                    <Link to="/">
                        <li className="text-3xl tracking-widest text-white font-semibold">GOGAR</li>
                    </Link>
                    <li className="text-2xl cursor-pointer text-white">
                        {
                            !show ?
                                (<i
                                    className="fas fa-angle-down"
                                    onClick={() => setShow(!show)}
                                ></i>) :
                                (<i
                                    className="fas fa-angle-up"
                                    onClick={() => setShow(!show)}
                                ></i>)
                        }
                    </li>
                </ul>
            </header>
            <SidebarList show={show} setShow={setShow} />
        </div>
    )
}

const SidebarList = ({ show, setShow }) => {

    return (
        <ul className={`bg-custom-fourth absolute sidebar-list top-20 left-0 right-0 bottom-0 z-10 opacity-80 ${show || "hidden"} animate__animated animate__fadeInDown animate__faster border-t-2 flex flex-col items-center justify-center`}>
            <SidebarListItem
                to="/home"
                title="Home"
                icon="fas fa-home"
                onClick={() => setShow(false)}
            />
            <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
                <SidebarListItem
                    to="/usuarios"
                    title="Users"
                    icon="fas fa-user"
                    onClick={() => setShow(false)}
                />
            </PrivateComponent>
            <Logout />
            {/* <SidebarListItem
                to="/"
                title="Logout"
                icon="fas fa-sign-out-alt"
                onClick={()=>setShow(false)}
            /> */}
        </ul>
    )
}

const SidebarListItem = ({ to, title, icon }) => {
    return (
        <NavLink
            exact
            to={to}
            className={
                ({ isActive }) => (
                    isActive
                        ? "text-3xl bg-white md:bg-custom-fourth py-2 px-5 rounded-lg mb-4 md:text-xl "
                        : "text-3xl py-2 px-5 mb-4 md:text-xl item-sidebar"
                )
            }
        >
            <div
                className="flex items-center">
                <i className={icon}></i>
                <span className="ml-2">{title}</span>
            </div>
        </NavLink>
    )
}

const Logout = () => {

    const { setToken } = useAuthContext()

    return (
        <NavLink
            exact
            to="/auth/login"
            className={
                ({ isActive }) => (
                    isActive
                        ? "text-3xl bg-white md:bg-custom-fourth py-2 px-5 rounded-lg mb-4 md:text-xl "
                        : "text-3xl py-2 px-5 mb-4 md:text-xl item-sidebar"
                )
            }
        >
            <div
                onClick={() => setToken(null)}
                className="flex items-center">
                <i className="fas fa-sign-out-alt"></i>
                <span className="ml-2">{"Logout"}</span>
            </div>
        </NavLink>
    )
}

export const SidebarDesktop = () => {

    return (
        <div className="bg-white hidden md:block h-full w-40 lg:w-48 overflow-visible px-4 lg:px-8 pt-10 animate__animated animate__fadeInLeft animate__faster">
            <h1 className="text-3xl tracking-widest text-custom-fourth font-semibold mb-8">GOGAR</h1>
            <ul className="flex flex-col justify-center">
                <SidebarListItem
                    to="/home"
                    title="Home"
                    icon="fas fa-home"
                />
                <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
                    <SidebarListItem
                        to="/usuarios"
                        title="Users"
                        icon="fas fa-user"
                    />
                </PrivateComponent>
                <Logout />
                {/* <SidebarListItem
                    to="/"
                    title="Logout"
                    icon="fas fa-sign-out-alt"
                /> */}
            </ul>
        </div>
    )

}


export default SidebarMobile
