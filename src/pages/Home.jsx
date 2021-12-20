import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'

const Home = () => {

    const { userData } = useUser()
    const navigate = useNavigate()
    const move = () => {
        if (userData.rol === "LIDER") {
            navigate("/crear")
        } else {
            toast.error("Solo los lideres pueden crear proyectos")
        }
    }

    return (
        <div className="w-full h-full">
            <h1 className="w-full bg-white px-2 py-3 rounded-sm text-center text-3xl mb-10 font-bold ">{`Hola ${userData.nombre}!`}</h1>
            <section className="bg-white rounded-sm shadow-lg">
                <h2 className="text-xl text-center shadow py-4 font-bold ">Te contamos que puedes hacer en nuestra aplicación</h2>
                <ul className="grid grid-cols-1 lg:grid-cols-3 p-2 md:p-10 gap-4 gap-y-10">
                    <li className="shadow-xl p-3">
                        <h3 className="text-lg font-semibold">Crea, lista y edita tus proyectos <span className="text-custom-fourth">(Lider)</span></h3>
                        <main>
                            <p className="border-b-2 pb-2">Si eres un usuario lider puedes empezar a crear y liderar proyectos
                                <span
                                    onClick={move}
                                    className="font-bold text-custom-fourth cursor-pointer"> Aqui
                                </span>
                            </p>
                            <section className="mt-2">
                                <h3 className="font-bold">Podras</h3>
                                <ul className="pl-7 grid grid-cols-1 mt-2 gap-3">
                                    <li> <i className="fas fa-check bg-custom-fourth p-1 rounded-full text-white mr-2"></i>Listar, aceptar o rechazar inscripciones</li>
                                    <li> <i className="fas fa-check bg-custom-fourth p-1 rounded-full text-white mr-2"></i>Listar los avances de los estudiantes</li>
                                    <li> <i className="fas fa-check bg-custom-fourth p-1 rounded-full text-white mr-2"></i>Agregar observaciones a dichos avances</li>
                                    <li> <i className="fas fa-check bg-custom-fourth p-1 rounded-full text-white mr-2"></i>Editar los datos de tu proyecto</li>
                                </ul>
                            </section>
                        </main>
                    </li>
                    <li className="shadow-xl p-3">
                        <h3 className="text-lg font-semibold">Inscribete a proyectos <span className="text-custom-fourth">(Estudiante)</span></h3>
                        <main>
                            <p className="border-b-2 pb-2">Si eres un usuario estudiante puedes listar los proyectos e inscribirte
                                <span
                                    onClick={() => {
                                        if (userData.rol === "ESTUDIANTE") navigate("/proyectos")
                                        else {
                                            toast.error("Solo los estudiantes pueden listar los proyectos disponibles")
                                        }
                                    }}
                                    className="font-bold text-custom-fourth cursor-pointer"> Aqui
                                </span>
                            </p>
                            <section className="mt-2">
                                <h3 className="font-bold">Podras</h3>
                                <ul className="pl-7 grid grid-cols-1 mt-2 gap-3">
                                    <li> <i className="fas fa-check bg-custom-fourth p-1 rounded-full text-white mr-2"></i>Listar los proyectos disponibles
                                    </li>
                                    <li> <i className="fas fa-check bg-custom-fourth p-1 rounded-full text-white mr-2"></i>Inscribirte a los proyectos</li>
                                    <li> <i className="fas fa-check bg-custom-fourth p-1 rounded-full text-white mr-2"></i>Listar los proyectos a los que tu inscripción fue aceptada o está en espera
                                        <span
                                            onClick={() => {
                                                if (userData.rol === "ESTUDIANTE") navigate("/inscritos")
                                                else {
                                                    toast.error("Acceso no permitido")
                                                }
                                            }}
                                            className="font-bold text-custom-fourth cursor-pointer"> Aqui
                                        </span>
                                    </li>
                                </ul>
                            </section>
                        </main>
                    </li>
                    <li className="shadow-xl p-3">
                        <h3 className="text-lg font-semibold">Agrega avances <span className="text-custom-fourth">(Estudiante)</span></h3>
                        <main>
                            <p className="border-b-2 pb-2">Si fuiste admitido a un proyecto puedes empezar a agregar avances en este
                            </p>
                            <section className="mt-2">
                                <h3 className="font-bold">Podras</h3>
                                <ul className="pl-7 grid grid-cols-1 mt-2 gap-3">
                                    <li> <i className="fas fa-check bg-custom-fourth p-1 rounded-full text-white mr-2"></i>Agrega avances a un proyecto especifico
                                    </li>
                                    <li> <i className="fas fa-check bg-custom-fourth p-1 rounded-full text-white mr-2"></i>Lista tus avances y los de tus compañeros</li>
                                    <li> <i className="fas fa-check bg-custom-fourth p-1 rounded-full text-white mr-2"></i>Lista las observaciones del lider a tus avances
                                    </li>
                                </ul>
                            </section>
                        </main>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default Home
