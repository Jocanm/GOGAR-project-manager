import React from 'react'
import { useUser } from '../../context/UserContext'

const Listar = () => {

    const {userData} = useUser()

    if(userData.rol === "LIDER"){
        return(
            <div>
                Pagina donde un lider puede ver los proyectos creados por el
            </div>
        )
    }

    if(userData.rol === "ESTUDIANTE"){
        return(
            <div>
                Pagina donde un estudiante puede ver los proyectos a los que se puede inscribir
            </div>
        )
    }

    return(
        <div>
            Pagina donde un administrador puede ver los proyectos creados por todos los lideres
        </div>
    )

}

export default Listar
