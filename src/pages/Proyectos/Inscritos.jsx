import { useQuery } from '@apollo/client'
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import PrivateComponent from '../../components/PrivateComponent'
import { useUser } from '../../context/UserContext'
import {GET_INSCRIPCIONES} from '../../graphql/inscripciones/queries'
import ReactLoading from 'react-loading';

const Inscritos = () => {

    const {userData} = useUser()

    const {data,loading, error} = useQuery(GET_INSCRIPCIONES,{
        variables:{_id:userData._id}
    })

    useEffect(() => {
        console.log("data INSCRIPCIONES:",data)
    },[data])

    if(loading){
        return (
            <div className="h-screen mx-auto flex items-center justify-center">
                <ReactLoading type="spin" height="20%" width="20%" />
            </div>
        )
    }

    return (
        <div>
            <ListaProyectos
                proyectos={data.inscripcionesEstudiante}
            />
        </div>
    )
}

const ListaProyectos = ({ proyectos }) => {

    return (
        <ul
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
            {
                proyectos.map(proyecto => (
                    <ProyectoItem
                        key={proyecto._id}
                        proyecto={proyecto}
                    />
                ))
            }
        </ul>
    )

}

const ProyectoItem = ({ proyecto }) => {

    const { userData } = useUser();

    const [objetivoGeneral] = useState(proyecto.proyecto.objetivos.find(e => e.tipo === "GENERAL"))
    const [objetivosEspecificos] = useState(proyecto.proyecto.objetivos.filter(e => e.tipo === "ESPECIFICO"))



    return (
        <li
            className={`bg-white rounded-md p-5 relative pb-10 ${userData.rol === "ESTUDIANTE" || userData.rol === "LIDER" ? "pb-10" : "pb-5"}`}
        >
            <h2
                className="text-lg font-semibold mb-2"
            >{proyecto.proyecto.nombre}</h2>
            <p className={`mb-2 ${userData.rol === "LIDER" && "hidden"}`}>
                <span className="font-bold mr-2">Creado por:</span>
                <span>{proyecto.proyecto.lider.nombre} {proyecto.proyecto.lider.apellido}</span>
            </p>
            <p className="border-b-2 pb-4 mb-3">{objetivoGeneral.descripcion}</p>
            <h3 className="font-semibold mb-2">Objetivos especificos:</h3>
            <div className="mb-3">
                {
                    objetivosEspecificos.map(e => (
                        <div 
                        key={nanoid()}
                        className="ml-3 mb-1">
                            <i className="fas fa-check-square mr-2"></i>
                            {e.descripcion}
                        </div>
                    ))
                }
            </div>
            {/* <PrivateComponent roleList={["ESTUDIANTE"]}>
                <GenerarInscripcion proyecto={proyecto} />
            </PrivateComponent>
            <PrivateComponent roleList={["LIDER"]}>
                <button
                    className="bg-custom-five hover:bg-custom-fourth px-3 py-1 rounded-md text-custom-first font-semibold absolute bottom-4 left-4"
                >Detalles</button>
            </PrivateComponent>
            <PrivateComponent roleList={["ADMINISTRADOR"]}>
                <div className={`${proyecto.estado === "ACTIVO" && "hidden"}`}>
                    <AprobarProyecto
                        proyecto={proyecto}
                    />
                </div>
            </PrivateComponent> */}
        </li>
    )
}

export default Inscritos
