import React from 'react'
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({roleList,children}) => {
    
    const {userData} = useUser();

    if(roleList.includes(userData.rol)){
        return <>{children}</>
    }

    return <SinAcceso userData={userData}/>
}


const SinAcceso = ({userData}) =>{

    return (

        <div className="container flex flex-col items-center justify-center w-full h-full mx-auto">
            <div className="p-20 bg-white flex flex-col items-center justify-center rounded-lg shadow-2xl w-auto h-auto">
                <div className="text-8xl md:text-9xl font-extrabold text-custom-first">UPS! :(</div>
                <strong className="text-2xl text-custom-first mt-9">{`Lo sentimos ${userData.nombre}, parece que no tienes los permisos para acceder a esta información.`}</strong>
                <Link to ="/home">
                    <button className="mt-5 bg-custom-five text-white px-8 py-3 font-bold text-lg rounded-xl hover:shadow-lg hover:bg-custom-fourth">
                        Home
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default PrivateRoute