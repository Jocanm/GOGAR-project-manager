import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import PrivateComponent from './PrivateComponent'
import {useUser} from '../context/UserContext'
import {useNavigate} from 'react-router'

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

    const [open, setOpen] = useState(false)

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
            <li
                className="text-3xl py-2 px-5 mb-4 md:text-lg item-sidebar cursor-pointer"
            >
                <div
                    onClick={() => setOpen(!open)}
                    className="flex items-center">
                    <i className={"fas fa-tasks"}></i>
                    <span className="mx-2">{"Proyectos"}</span>
                    <i className={`fas fa-chevron-${open ? "up" : "down"} text-sm relative top-px`}></i>
                </div>
            </li>
            <SidebarListItem
                to="/crear"
                icon="fas fa-plus"
                title="Crear"
                extra={`ml-2 animate__animated animate__faster ${open ? "block animate__fadeInDown" : "hidden"}`}
            />
            <SidebarListItem
                to="/proyectos"
                icon="fas fa-book-reader"
                title="Listar"
                extra={`ml-2 -mt-4 animate__animated animate__faster ${open ? "block animate__fadeInDown" : "hidden"}`}
            />
            <Logout />
        </ul>
    )
}

const SidebarListItem = ({ to, title, icon, extra = "" }) => {
    return (
        <NavLink
            to={to}
            className={
                ({ isActive }) => (
                    isActive
                        ? `text-3xl bg-white md:bg-custom-fourth py-2 px-5 rounded-lg mb-4 md:text-lg ${extra}`
                        : `text-3xl py-2 px-5 mb-4 md:text-lg item-sidebar ${extra}`
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
            to="/auth/login"
            className={
                ({ isActive }) => (
                    isActive
                        ? "text-3xl bg-white md:bg-custom-fourth py-2 px-5 rounded-lg mb-4 md:text-lg "
                        : "text-3xl py-2 px-5 mb-4 md:text-lg item-sidebar"
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

    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="bg-white hidden md:block h-full w-44 lg:w-48 overflow-visible px-2 lg:px-4 pt-10 animate__animated animate__fadeInLeft animate__faster border-r-2">
                <h1 className="text-3xl tracking-widest text-custom-fourth font-semibold mb-8 text-center">GOGAR</h1>
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
                    <li
                        className="text-3xl py-2 px-5 mb-4 md:text-lg item-sidebar cursor-pointer"
                    >
                        <div
                            onClick={() => setOpen(!open)}
                            className="flex items-center">
                            <i className={"fas fa-tasks"}></i>
                            <span className="mx-2">{"Proyectos"}</span>
                            <i className={`fas fa-chevron-${open ? "up" : "down"} text-sm relative top-px`}></i>
                        </div>
                    </li>
                    <PrivateComponent roleList={["LIDER"]}>
                        <SidebarListItem
                            to="/crear"
                            icon="fas fa-plus"
                            title="Crear"
                            extra={`ml-6 animate__animated animate__faster ${open ? "block animate__fadeInLeft" : "hidden"}`}
                        />
                    </PrivateComponent>
                    <SidebarListItem
                        to="/proyectos"
                        icon="fas fa-book-reader"
                        title="Listar"
                        extra={`ml-6 -mt-4 animate__animated animate__faster ${open ? "block animate__fadeInLeft" : "hidden"}`}
                    />
                    <PrivateComponent roleList={"ESTUDIANTE"}>
                        <SidebarListItem
                            to="/inscritos"
                            icon="fas fa-folder-open"
                            title="Inscritos"
                            extra={`ml-6 -mt-4 animate__animated animate__faster ${open ? "block animate__fadeInLeft" : "hidden"}`}
                        />
                    </PrivateComponent>
                    <Logout />
                </ul>
            </div>

        </>
    )

}

export const Header = () => {

    const navigate = useNavigate()

    const {userData} = useUser()

    return (
        <header className="bg-white w-full text-right sticky top-0 z-10 py-2 border-b-2 shadow-xl hidden md:block pr-8 font-bold "> 
            <span className="border-b-2 border-custom-fourth">{userData.nombre} {userData.apellido} - {userData.rol}</span>
            <i 
            onClick={() =>navigate(`/usuarios/${userData._id}`)}
            className="fa fa-user ml-3 bg-custom-fourth p-2 rounded-full cursor-pointer text-white"></i>
        </header>
    )
}



export default SidebarMobile
