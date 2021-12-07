import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useQuery } from '@apollo/client'
import { PROYECTOS_LIDER } from '../../graphql/proyectos/queries'
import ReactLoading from 'react-loading';
import PrivateComponent from '../../components/PrivateComponent';

const Listar = () => {

    const { userData } = useUser()

    if (userData.rol === "LIDER") {
        return (
            <ProyectosLider userData={userData} />
        )
    }

    if (userData.rol === "ESTUDIANTE") {
        return (
            <div>
                Pagina donde un estudiante puede ver los proyectos a los que se puede inscribir
            </div>
        )
    }

    return (
        <div>
            Pagina donde un administrador puede ver los proyectos creados por todos los lideres
        </div>
    )

}

const ProyectosLider = ({ userData }) => {

    const { _id } = userData

    const { data, loading, error } = useQuery(PROYECTOS_LIDER, {
        variables: { _id }
    })

    useEffect(() => {
        console.log(data)
    }, [data])

    if (loading) return (
        <div className="h-screen mx-auto flex items-center justify-center">
            <ReactLoading type="spin" height="20%" width="20%" />
        </div>
    )

    return (
        <div>
            <h1 className="bg-white mb-6 text-center py-3 rounded font-semibold text-xl">Mis proyectos</h1>
            <ListaProyectos
                proyectos={data.Usuario.projectosLiderados}
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

    const {userData} = useUser();

    const [objetivoGeneral, setObjetivoGeneral] = useState({})
    const [objetivosEspecificos, setObjetivosEspecificos] = useState(proyecto.objetivos.filter(e => e.tipo === "ESPECIFICO"))

    useEffect(() => {
        setObjetivoGeneral(proyecto.objetivos.find(e => e.tipo === "GENERAL"))
        console.log("objetivoGeneral: ", objetivoGeneral)
    }, [objetivoGeneral])

    return (
        <li
            className={`bg-white rounded-md p-5 relative ${userData.rol==="ESTUDIANTE"?"pb-10":"pb-5"} cursor-pointer`}
        >
            <h2
                className="text-lg font-semibold mb-2"
            >{proyecto.nombre}</h2>
            <p className="border-b-2 pb-4 mb-3">{objetivoGeneral.descripcion}</p>
            <h3 className="font-semibold mb-2">Objetivos especificos:</h3>
            <div className="mb-3">
                {
                    objetivosEspecificos.map(e => (
                        <div className="ml-3 mb-1">
                            <i className="fas fa-check-square mr-2"></i>
                            {e.descripcion}
                        </div>
                    ))
                }
            </div>
            <PrivateComponent roleList={["ESTUDIANTE"]}>
                <button
                    className="bg-custom-five hover:bg-custom-fourth px-3 py-1 rounded-md text-custom-first font-semibold absolute bottom-2"
                >Inscribete</button>
            </PrivateComponent>
        </li>
    )
}

export default Listar
