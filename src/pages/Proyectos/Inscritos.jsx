import { useQuery } from '@apollo/client'
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import PrivateComponent from '../../components/PrivateComponent'
import { useUser } from '../../context/UserContext'
import { GET_INSCRIPCIONES } from '../../graphql/inscripciones/queries'
import ReactLoading from 'react-loading';

const Inscritos = () => {

    const { userData } = useUser()

    const { data, loading, refetch } = useQuery(GET_INSCRIPCIONES, {
        variables: { _id: userData._id }
    })

    const [tipo, setTipo] = useState("PENDIENTE")
    const [dataFiltrada2, setDataFiltrada2] = useState([])

    useEffect(() => {
        refetch()
    },[refetch])

    useEffect(() => {
        if (data && data.inscripcionesEstudiante) {
            setDataFiltrada2(data.inscripcionesEstudiante.filter(e => e.estado === tipo && e.fechaEgreso === undefined))
        }
    }, [tipo, data])

    if (loading) {
        return (
            <div className="h-screen mx-auto flex items-center justify-center">
                <ReactLoading type="spin" height="20%" width="20%" />
            </div>
        )
    }

    return (
        <div>
            <h1 className="bg-white mb-6 text-center py-3 rounded font-semibold text-xl mt-10 md:mt-0">Proyectos Inscritos</h1>
            <section className="mb-6 flex">
                <button
                    onClick={() => setTipo("ACEPTADA")}
                    className={`px-4 py-2 mr-1 rounded w-full md:w-auto font-bold hover:bg-custom-five ${tipo === "ACEPTADA" ? "bg-custom-five" : "bg-white"}`}>Admitidos
                </button>
                <button
                    onClick={() => setTipo("PENDIENTE")}
                    className={`px-4 py-2 rounded w-full md:w-auto font-bold hover:bg-custom-five ${tipo === "PENDIENTE" ? "bg-custom-five" : "bg-white"}`}>Sin aprobar
                </button>
            </section>
            <ListaProyectos
                inscripciones={dataFiltrada2}
            />
        </div>
    )
}

const ListaProyectos = ({ inscripciones }) => {

    return (
        <ul
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
            {
                inscripciones.map(inscripcion => (
                    <ProyectoItem
                        key={inscripcion._id}
                        inscripcion={inscripcion}
                    />
                ))
            }
        </ul>
    )

}

const ProyectoItem = ({ inscripcion }) => {

    const { userData } = useUser();

    const [objetivoGeneral] = useState(inscripcion.proyecto.objetivos.find(e => e.tipo === "GENERAL"))
    const [objetivosEspecificos] = useState(inscripcion.proyecto.objetivos.filter(e => e.tipo === "ESPECIFICO"))

    return (
        <li
            className={`bg-white rounded-md p-5 relative pb-10 animate__animated animate__fadeIn animate__faster`}
        >
            <main className="flex justify-between mb-2 text-lg font-semibold">
                <h2 className="capitalize">{inscripcion.proyecto.nombre}</h2>
                <h2>
                    {inscripcion.proyecto.estado}
                    <i className={`fas fa-circle ml-2 ${inscripcion.proyecto.estado === "ACTIVO" ? "text-lime-600" : "text-red-700"}`}></i>
                </h2>
            </main>
            <p className={`mb-2 ${userData.rol === "LIDER" && "hidden"}`}>
                <span className="font-bold mr-2">Creado por:</span>
                <span>{inscripcion.proyecto.lider.nombre} {inscripcion.proyecto.lider.apellido}</span>
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
            <button
                className={`bg-custom-five hover:bg-custom-fourth px-3 py-1 rounded-md text-custom-first font-semibold absolute bottom-4 right-4 ${inscripcion.estado !== "ACEPTADA" && "hidden"}`}
            >Agregar avances
            </button>
        </li>
    )
}

export default Inscritos
