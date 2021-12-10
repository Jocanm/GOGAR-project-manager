import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useQuery, useMutation } from '@apollo/client'
import { GET_PROYECTOS, PROYECTOS_LIDER } from '../../graphql/proyectos/queries'
import ReactLoading from 'react-loading';
import PrivateComponent from '../../components/PrivateComponent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CREAR_INSCRIPCION } from '../../graphql/inscripciones/mutations';
import { APROBAR_PROYECTO, INACTIVAR_PROYECTO } from '../../graphql/proyectos/mutations';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import { GET_INSCRIPCION } from '../../graphql/inscripciones/queries'
import { useNavigate } from 'react-router'



const Listar = () => {

    const { userData } = useUser()

    if (userData.rol === "LIDER") {
        return (
            <>
                <ProyectosLider userData={userData} />
            </>
        )
    }

    if (userData.rol === "ESTUDIANTE") {
        return (
            <>
                <ProyectosEstudiante />
            </>
        )
    }

    if (userData.rol === "ADMINISTRADOR") {
        return (
            <>
                <ProyectosAdministrador />
            </>
        )
    }

    return (
        <div className="h-screen mx-auto flex items-center justify-center">
            <ReactLoading type="spin" height="20%" width="20%" />
        </div>
    )

}

const ProyectosLider = ({ userData }) => {

    const { _id } = userData

    const { data, loading, error } = useQuery(PROYECTOS_LIDER, {
        variables: { _id }
    })

    const [filtro, setFiltro] = useState("ACTIVO")
    const [dataFiltrada, setDataFiltrada] = useState([])

    useEffect(() => {
        if (data && data.Usuario.projectosLiderados) {
            if (filtro === "TERMINADO") {
                setDataFiltrada(data.Usuario.projectosLiderados.filter(e => e.fase === "TERMINADO"))
            }
            else if (filtro === "INACTIVO") {
                setDataFiltrada(data.Usuario.projectosLiderados.filter(e => e.estado === "INACTIVO" && e.fase === "NULA"))
            }
            else {
                setDataFiltrada(data.Usuario.projectosLiderados.filter(e => e.estado === filtro))
            }
        }
    }, [data, filtro])

    if (loading) return (
        <div className="h-screen mx-auto flex items-center justify-center">
            <ReactLoading type="spin" height="20%" width="20%" />
        </div>
    )

    return (
        <div>
            <h1 className="bg-white mb-6 text-center py-3 rounded font-semibold text-xl mt-10 md:mt-0">Mis proyectos</h1>
            <section className="mb-6 flex">
                <button
                    onClick={() => setFiltro("ACTIVO")}
                    className={`px-4 py-2 mr-1 rounded w-full md:w-auto font-bold hover:bg-custom-five ${filtro === "ACTIVO" ? "bg-custom-five" : "bg-white"}`}>Activos
                </button>
                <button
                    onClick={() => setFiltro("INACTIVO")}
                    className={`px-4 py-2 mr-1 rounded w-full md:w-auto font-bold hover:bg-custom-five ${filtro === "INACTIVO" ? "bg-custom-five" : "bg-white"}`}>Sin aprobar
                </button>
                <button
                    onClick={() => setFiltro("TERMINADO")}
                    className={`px-4 py-2 rounded w-full md:w-auto font-bold hover:bg-custom-five ${filtro === "TERMINADO" ? "bg-custom-five" : "bg-white"}`}>Terminados
                </button>
            </section>
            <ListaProyectos
                proyectos={dataFiltrada}
            />
        </div>
    )
}

const ProyectosEstudiante = () => {

    const { data, loading, error } = useQuery(GET_PROYECTOS)

    const [dataFiltrada, setDataFiltrada] = useState([])

    useEffect(() => {
        if (data && data.Proyectos) {
            setDataFiltrada(data.Proyectos.filter(e => e.estado === "ACTIVO"))
        }
    }, [data])

    if (loading) return (
        <div className="h-screen mx-auto flex items-center justify-center">
            <ReactLoading type="spin" height="17%" width="17%" />
        </div>
    )

    return (
        <>
            <h1 className="bg-white mb-6 text-center py-3 rounded font-semibold text-xl mt-10 md:mt-0">Proyectos disponibles</h1>
            <ListaProyectos
                proyectos={dataFiltrada}
            />
        </>
    )

}

const ProyectosAdministrador = () => {

    const { data, loading, error } = useQuery(GET_PROYECTOS)

    const [tipo, setTipo] = useState("ACTIVO")
    const [dataFiltrada, setDataFiltrada] = useState([])

    useEffect(() => {
        if (data && data.Proyectos) {
            setDataFiltrada(data.Proyectos.filter(e => e.estado === tipo && e.fase !== "TERMINADO"))
        }
    }, [tipo, data])

    if (loading) return (
        <div className="h-screen mx-auto flex items-center justify-center">
            <ReactLoading type="spin" height="20%" width="20%" />
        </div>
    )

    return (
        <div>
            <h1 className="bg-white mb-6 text-center py-3 rounded font-semibold text-xl mt-10 md:mt-0">Proyectos creados</h1>
            <section className="mb-6 flex">
                <button
                    onClick={() => setTipo("INACTIVO")}
                    className={`px-4 py-2 mr-1 rounded w-full md:w-auto font-bold hover:bg-custom-five ${tipo === "INACTIVO" ? "bg-custom-five" : "bg-white"}`}>Inactivos
                </button>
                <button
                    onClick={() => setTipo("ACTIVO")}
                    className={`px-4 py-2 rounded w-full md:w-auto font-bold hover:bg-custom-five ${tipo === "ACTIVO" ? "bg-custom-five" : "bg-white"}`}>Activos
                </button>
            </section>
            <ListaProyectos
                proyectos={dataFiltrada}
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

    const navigate = useNavigate()

    const { userData } = useUser();

    const [objetivoGeneral] = useState(proyecto.objetivos.find(e => e.tipo === "GENERAL"))
    const [objetivosEspecificos] = useState(proyecto.objetivos.filter(e => e.tipo === "ESPECIFICO"))

    return (
        <li
            className={`bg-white rounded-md p-5 relative pb-10 ${userData.rol === "ESTUDIANTE" || userData.rol === "LIDER" ? "pb-10" : "pb-5"} animate__animated animate__fadeIn animate__faster ${proyecto.fase === "TERMINADO" && "border-2 border-red-500"}`}
        >
            <main className="flex justify-between mb-2 text-lg font-semibold">
                <h2 className="capitalize">{proyecto.nombre}</h2>
                <h2>
                    {proyecto.estado}
                    <i className={`fas fa-circle ml-2 ${proyecto.estado === "ACTIVO" ? "text-lime-600" : "text-red-700"}`}></i>
                </h2>
            </main>
            <p className={`mb-2 ${userData.rol === "LIDER" && "hidden"}`}>
                <span className="font-bold mr-2">Creado por:</span>
                <span>{proyecto.lider.nombre} {proyecto.lider.apellido}</span>
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
            {
                proyecto.fechaFinal && (
                    <div className={`border-t-2 pt-1`}>
                        fecha Final:
                    </div>
                )
            }
            <PrivateComponent roleList={["ESTUDIANTE"]}>
                <GenerarInscripcion proyecto={proyecto} />
            </PrivateComponent>
            <PrivateComponent roleList={["LIDER", "ESTUDIANTE"]}>
                <button
                    onClick={() => navigate(`/proyectos/${proyecto._id}`)}
                    className={`bg-custom-five hover:bg-custom-fourth px-3 py-1 rounded-md text-custom-first font-semibold absolute bottom-4 left-4 ${proyecto.fase === "TERMINADO" && "hidden"}`}
                >Detalles
                </button>
            </PrivateComponent>
            <PrivateComponent roleList={["ADMINISTRADOR"]}>
                {
                    proyecto.estado === "INACTIVO" ?
                        (<AprobarProyecto
                            proyecto={proyecto}
                        />) :
                        (<InactivarProyecto
                            proyecto={proyecto}
                        />)
                }
            </PrivateComponent>
        </li>
    )
}

const InactivarProyecto = ({ proyecto }) => {

    const [open, setOpen] = useState(false)

    const [inactivar, { data, loading, error }] = useMutation(INACTIVAR_PROYECTO)

    const submit = () => {
        inactivar({
            variables: { _id: proyecto._id }
        })
    }

    useEffect(() => {
        if (data && data.inactivarProyecto) {
            toast.success(`Proyecto "${proyecto._id} inactivado correctamente"`)
            setOpen(false)
        }
    }, [data, proyecto._id])

    useEffect(() => {
        if (error) {
            toast.error("Ha ocurrido un error!")
            console.log("error:", error)
        }
    }, [error])

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`bg-custom-five hover:bg-custom-fourth px-3 py-1 rounded-md text-custom-first font-semibold absolute bottom-4 right-4`}
            >Inactivar</button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="md:ml-24"
            >
                <DialogTitle id="alert-dialog-title">
                    <h3 className="border-b-2">{"Inactivar proyecto"}</h3>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`¿Seguro que desea inactivar el proyecto "${proyecto.nombre}"?`}
                        <h3 className="mt-2 font-bold">Detalles:</h3>
                        <ul>
                            <li>Creado por: {proyecto.lider.nombre} {proyecto.lider.apellido}</li>
                            <li>Fase: {proyecto.fase}</li>
                            <li>Estado: {proyecto.estado}</li>
                        </ul>
                        <div className={`flex justify-center ${loading || "hidden"}`}>
                            <ReactLoading type="spin" height="10%" width="10%"
                                color='#FF4C29'
                            />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        loading || (
                            <>
                                <button
                                    className="bg-custom-five hover:bg-custom-fourth px-4 py-2 rounded-md font-semibold"
                                    onClick={() => setOpen(false)}>Cerrar</button>
                                <button
                                    onClick={submit}
                                    className="bg-custom-five hover:bg-custom-fourth px-4 py-2 rounded-md font-semibold">Inactivar</button>
                            </>
                        )
                    }
                </DialogActions>
            </Dialog>
        </>
    )

}

const AprobarProyecto = ({ proyecto }) => {

    const [open, setOpen] = useState(false)

    const [aprobar, { data, loading, error }] = useMutation(APROBAR_PROYECTO)

    const submit = () => {
        aprobar({
            variables: { _id: proyecto._id }
        })
    }

    useEffect(() => {
        if (data && data.aprobarProyecto) {
            setOpen(false)
            toast.success(`Proyecto "${proyecto.nombre}" aprobado correctamente`,
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    }, [data, proyecto.nombre])

    useEffect(() => {
        if (error) {
            toast.error("Ha ocurrido un error!")
            console.log("error:", error)
        }
    }, [error])

    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                className={`bg-custom-five hover:bg-custom-fourth px-3 py-1 rounded-md text-custom-first font-semibold absolute bottom-4 right-4`}
            >Activar proyecto</button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="md:ml-24"
            >
                <DialogTitle id="alert-dialog-title">
                    <h3 className="border-b-2">{"Aprobar Proyecto"}</h3>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`¿Desea activar el proyecto "${proyecto.nombre}"?`}
                        <h3 className="mt-2 font-bold">Detalles:</h3>
                        <ul>
                            <li>Creado por: {proyecto.lider.nombre} {proyecto.lider.apellido}</li>
                            <li>Fase: {proyecto.fase}</li>
                            <li>Estado: {proyecto.estado}</li>
                        </ul>
                        <div className={`flex justify-center ${loading || "hidden"}`}>
                            <ReactLoading type="spin" height="10%" width="10%"
                                color='#FF4C29'
                            />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        loading || (
                            <>
                                <button
                                    className="bg-custom-five hover:bg-custom-fourth px-4 py-2 rounded-md font-semibold"
                                    onClick={() => setOpen(false)}>Cerrar</button>
                                <button
                                    onClick={submit}
                                    className="bg-custom-five hover:bg-custom-fourth px-4 py-2 rounded-md font-semibold">Aprobar</button>
                            </>
                        )
                    }
                </DialogActions>
            </Dialog>
        </div>
    )

}

const GenerarInscripcion = ({ proyecto }) => {

    const navigate = useNavigate()

    const { userData } = useUser();

    const [open, setOpen] = useState(false)

    const [inscribirse, { data, loading, error }] = useMutation(CREAR_INSCRIPCION)

    const { data: queryData, loading: queryLoading, error: queryError } = useQuery(GET_INSCRIPCION, {
        variables: { proyecto: proyecto._id, estudiante: userData._id }
    })

    const submit = () => {
        if (queryData && queryData.Inscripcion) {
            if (!queryData.Inscripcion.fechaEgreso) {
                if (queryData.Inscripcion.estado === "PENDIENTE") {
                    toast.error("Ya tiene una inscripción en estado pendiente a este proyecto")
                } else if (queryData.Inscripcion.Estado === "ACPETADA") {
                    toast.error("Su inscripcion a este proyecto ya fue aceptada!")
                } else {
                    toast.error("No puede inscribirse a este proyecto")
                }
            } else {
                inscribirse({
                    variables: { estudiante: userData._id, proyecto: proyecto._id }
                })
            }
        } else {
            inscribirse({
                variables: { estudiante: userData._id, proyecto: proyecto._id }
            })
        }
    }

    useEffect(() => {
        if (data && data.crearInscripcion) {
            setOpen(false)
            toast.success(`Te has inscrito correctamente al proyecto "${proyecto.nombre}"`,
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            navigate("/inscritos")
            setTimeout(()=>{
                window.location.reload()
            },[500])
        }
    }, [data, proyecto.nombre])

    useEffect(() => {
        if (error) {
            toast.error("Ha ocurrido un error!")
            console.log(error)
        }
    }, [error])


    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-custom-five hover:bg-custom-fourth px-3 py-1 rounded-md text-custom-first font-semibold absolute bottom-4 right-4"
            >
                Inscribete
            </button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="md:ml-24"
            >
                <DialogTitle id="alert-dialog-title">
                    <h3 className="border-b-2">{"Generar inscripción"}</h3>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`¿Desea inscribirse al proyeto "${proyecto.nombre}"?`}
                        <h3 className="mt-2 font-bold">Detalles:</h3>
                        <ul>
                            <li>Creado por: {proyecto.lider.nombre} {proyecto.lider.apellido}</li>
                            <li>Presupuesto: {proyecto.presupuesto}</li>
                        </ul>
                        <div className={`flex justify-center ${loading || "hidden"}`}>
                            <ReactLoading type="spin" height="10%" width="10%"
                                color='#FF4C29'
                            />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        loading || (
                            <>
                                <button
                                    className="bg-custom-five hover:bg-custom-fourth px-4 py-2 rounded-md font-semibold"
                                    onClick={() => setOpen(false)}>Cerrar</button>
                                <button
                                    onClick={submit}
                                    className="bg-custom-five hover:bg-custom-fourth px-4 py-2 rounded-md font-semibold">Inscribirse</button>
                            </>
                        )
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Listar
