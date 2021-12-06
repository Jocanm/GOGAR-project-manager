import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [show, setShow] = useState(false)

    return (
        <ul className={`flex flex-col justify-center shadow-2xl text-warmGray-300 text-xl font-semibold hover:bg-white hover:shadow-2xl hover:text-custom-first py-5 ${show && "bg-white text-custom-first"} md:bg-custom-second md:text-warmGray-300 px-7 transicion`}>
            <div className="flex justify-between w-full">
                <Link to="/">
                    <li className="text-3xl tracking-widest">GOGAR</li>
                </Link>
                <li className="hidden md:block relative top-1">
                    <Link to="/auth/login">
                        <span className="cursor-pointer mr-5 hover:text-custom-fourth">Login</span>
                    </Link>
                    <Link to="/auth/registro">
                        <span
                            className="cursor-pointer bg-custom-fourth px-4 py-2 rounded-lg hover:shadow-lg hover:text-white"
                        >
                            Try it for free
                        </span>
                    </Link>
                </li>
                <li className="text-2xl block md:hidden cursor-pointer">
                    {
                        !show ?
                            (<i
                                className="fas fa-angle-down"
                                onClick={() => setShow(!show)}
                            ></i>) :
                            (<i
                                class="fas fa-angle-up"
                                onClick={() => setShow(!show)}
                            ></i>)
                    }
                </li>
            </div>
            {
                show && (
                    <li className="flex flex-col items-start mt-4 md:hidden animate__animated animate__fadeInDown animate__faster">
                        <Link to="/auth/login">
                            <span className="hover:text-custom-fourth text-sm mb-4">Login</span>
                        </Link>
                        <Link to="/auth/registro">
                            <span
                                className="bg-custom-fourth rounded-lg hover:shadow-lg hover:text-white text-sm px-4 py-2"
                            >
                                Try it for free
                            </span>
                        </Link>
                    </li>
                )
            }
        </ul>
    )
}


export default Navbar
