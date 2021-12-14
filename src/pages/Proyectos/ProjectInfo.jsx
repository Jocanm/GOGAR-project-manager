import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import { useParams, useNavigate } from 'react-router'
import { useUser } from '../../context/UserContext'
import { useMutation, useQuery } from '@apollo/client'
import { GET_AVANCES, GET_PROYECTO } from '../../graphql/proyectos/queries';
import useFormData from '../../hooks/useFormData';
import Input from '../../components/Input';
import ButtonLoading from '../../components/ButtonLoading';
import toast from 'react-hot-toast';
import { ACTUALIZAR_PROYECTO, TERMINAR_PROYECTO } from '../../graphql/proyectos/mutations';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { APROBAR_INSCRIPCION } from '../../graphql/inscripciones/mutations';
import { AGREGAR_OBSERVACIONES } from '../../graphql/avances/mutation';


const ProjectInfo = () => {

    const navigate = useNavigate()
    const { _id } = useParams()
    const { userData } = useUser()

    if (userData.rol === "LIDER") {
        return (
            <ProjectInfoLider _id={_id} />
        )
    }

    if (userData.rol === "ESTUDIANTE") {
        return (
            <ProjectInfoStudent _id={_id} />
        )
    }

    if (userData.rol === "ADMINISTRADOR") {
        navigate("/proyectos")
    }

    return (
        <div className="h-screen mx-auto flex items-center justify-center">
            <ReactLoading type="spin" height="20%" width="20%" />
        </div>
    )
}

const ProjectInfoStudent = ({ _id }) => {

    const { data, loading, error } = useQuery(GET_PROYECTO, {
        variables: { _id }
    })

    useEffect(() => {
        console.log("Data del proyecto:", data)
    }, [data])

    return (
        <div className="text-white">
            Esta es la pagina donde un estudiante prodria ver los avances a los proyectos que esta inscrito y el agregar avances tambien
        </div>
    )

}

const ProjectInfoLider = ({ _id }) => {

    const navigate = useNavigate()

    const { data, loading, error } = useQuery(GET_PROYECTO, {
        variables: { _id }
    })

    const [actualizar, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(ACTUALIZAR_PROYECTO)

    const [show, setShow] = useState(false)

    const { form, formData, updateFormData } = useFormData(null)

    const submitForm = (e) => {
        e.preventDefault()
        actualizar({ variables: { _id, ...formData, presupuesto: Number(formData.presupuesto) } })
    }

    useEffect(() => {
        if (mutationData && mutationData.actualizarProyecto) {
            toast.success("Proyecto actualizado correctamente!")
            setShow(false)
        }
    }, [mutationData])

    if (loading) {
        return (
            <div className="h-screen mx-auto flex items-center justify-center">
                <ReactLoading type="spin" height="20%" width="20%" />
            </div>
        )
    }

    return (
        <div className="text-white flex flex-col">
            <div className="py-12 px-10 bg-custom-third mt-8 md:mt-2 mx-4 rounded-sm shadow-xl md:px-16 lg:mx-20 relative">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold my-4" >{data.Proyecto.nombre}</h1>
                <div className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">Estado actual - {data.Proyecto.estado}</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-semibold">Fase actual - {data.Proyecto.fase}</div>
                <i
                    className="fas fa-undo absolute text-4xl top-10 right-8 text-custom-five cursor-pointer hover:text-custom-fourth"
                    onClick={() => navigate(-1)}
                ></i>
                <div className="flex justify-between">
                    <button
                        onClick={() => setShow(!show)}
                        className="bg-custom-five hover:bg-custom-fourth px-0 py-2 rounded-sm font-semibold relative top-4 mr-2 w-full"
                    >
                        Actualizar datos
                    </button>
                    <div className={`w-full ${data.Proyecto.fase === "TERMINADO" && "hidden"}`}>
                        <TerminarProyecto proyecto={data.Proyecto} />
                    </div>
                </div>
            </div>
            <div className={`py-12 px-7 bg-custom-third mt-8 mx-4 rounded-sm shadow-xl md:px-20 lg:mx-20 ${show || "hidden"}`}>
                <h2 className="text-xl sm:text-2xl lg:text-3xl text-white font-semibold my-4">Nuevos datos:</h2>
                <form
                    onSubmit={submitForm}
                    onChange={updateFormData}
                    ref={form}
                    className="flex flex-col text-gray-900">
                    <Input
                        label="Nombre"
                        name="nombre"
                        defaultValue={data.Proyecto.nombre}
                        type={"text"}
                    />
                    <Input
                        label="Presupuesto"
                        name="presupuesto"
                        defaultValue={data.Proyecto.presupuesto}
                        type={"number"}
                    />
                    {
                        mutationLoading ?
                            (<div className="w-full mx-auto flex items-center justify-center">
                                <ReactLoading type="spin" height="7%" width="7%" color='#FF4C29' />
                            </div>) :
                            (<ButtonLoading
                                disabled={Object.keys(formData).length === 0}
                                loading={mutationLoading}
                                text='Confirmar'
                            />)
                    }
                </form>
            </div>
            <MainInfo _id={_id} />
        </div>
    )
}

const MainInfo = ({ _id }) => {

    const [showAvances, setShowAvances] = useState(true)

    return (
        <div className="py-5 px-10 bg-custom-third mt-8 md:mt-2 mx-4 rounded-sm shadow-xl md:px-16 lg:mx-20 relative">
            <section className="flex justify-between mb-4">
                <button
                    onClick={() => setShowAvances(false)}
                    className="bg-custom-five hover:bg-custom-fourth px-4 py-2 rounded-sm font-semibold mr-2 w-full">Inscripciones</button>
                <button
                    onClick={() => setShowAvances(true)}
                    className="bg-custom-five hover:bg-custom-fourth px-4 py-2 rounded-sm font-semibold w-full">Avances</button>
            </section>
            {
                showAvances ?
                    (<Avances _id={_id} />) :
                    (<Inscripciones _id={_id} />)
            }
        </div>
    )
}

const Inscripciones = ({ _id }) => {

    const { data, loading, refetch } = useQuery(GET_PROYECTO, {
        variables: { _id }
    })

    const [dataFiltrada, setDataFiltrada] = useState([])

    const [aprobar, { data: mutationData, loading: mutationLoading, error: MutationError }] = useMutation(APROBAR_INSCRIPCION)

    useEffect(() => {
        setDataFiltrada(data.Proyecto.inscripciones.filter(e => e.estado === "PENDIENTE"))
    }, [data])

    useEffect(() => {
        console.log(data)
    }, [data])

    const submit = (_id) => {
        aprobar({ variables: { _id } })
        // console.log("_id",_id)
    }

    useEffect(() => {
        if (mutationData && mutationData.aprobarInscripcion) {
            toast.success("Estudiante aprobado correctamente!")
            refetch()
            // setTimeout(() => {
            //     window.location.reload()
            // }, [500])
        }
    }, [mutationData])

    if (loading) {
        return (
            <div className="h-screen mx-auto flex items-center justify-center">
                <ReactLoading type="spin" height="20%" width="20%" />
            </div>
        )
    }

    return (
        <section className="container mx-auto pt-6 md:p-">
            <div className="w-full overflow-hidden rounded-sm shadow-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">NOMBRE</th>
                                <th className="px-4 py-3">APELLIDO</th>
                                <th className="px-4 py-3">APROBAR</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white animate__animated animate__fadeIn animate__faster">
                            {
                                dataFiltrada.map(u => (
                                    <tr
                                        key={u._id}
                                        className="text-gray-700">
                                        <td className="flex px-4 py-3 border font-semibold capitalize">
                                            <span>{u.estudiante.identificacion}</span>
                                        </td>
                                        <td className="px-4 py-3 text-ms font-semibold border capitalize">{u.estudiante.nombre}</td>
                                        <td className="px-4 py-3 text-sm border">{u.estudiante.apellido}</td>
                                        <td className="px-4 py-3 text-ms font-semibold border text-center">
                                            <i
                                                onClick={() => submit(u._id)}
                                                className="fas fa-check cursor-pointer hover:text-custom-fourth"></i>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

const Avances = ({ _id }) => {

    const { data, loading, refetch } = useQuery(GET_AVANCES, {
        variables: { _id }
    })

    useEffect(() => { console.log(data) }, [data])

    if (loading) {
        return (
            <div className="mx-auto flex items-center justify-center">
                <ReactLoading type="spin" height="10%" width="10%" />
            </div>
        )
    }

    return (
        <div>
            <input
                className="input text-gray-900"
                type="text"
                placeholder="Busca por estudiante (Identificación)" />
            <section className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
                {
                    data.Proyecto.avances.map(e => (
                        <AvanceItem key={e._id} e={e} refetch={refetch}/>
                    ))
                }
            </section>
        </div>
    )
}

const AvanceItem = ({e,refetch}) => {



    const [agregarObs, { data, loading }] = useMutation(AGREGAR_OBSERVACIONES)

    const submit = () => {
        agregarObs({ variables: { id:e._id, observaciones: [...e.observaciones, nueva] } })
    }

    useEffect(() => {
        if (data && data.editarAvance) {
            toast.success("Observacion agregada correctamente!")
            setOpen(false)
            refetch()
            // setTimeout(() => {
            //     window.location.reload()
            // }, [500])
        }
    }, [data])

    return (
        <main className="bg-white text-gray-900 p-2 rounded-sm overflow-y-auto">
            <p className="capitalize">
                {e.creadoPor.nombre} {e.creadoPor.apellido} - {e.creadoPor.identificacion}
            </p>
            <span className="font-bold block">Aporte: </span>
            {e.descripcion}
            <div className="border-b-2 mb-2">
                <span className="font-bold">Fecha de creacion:</span> {e.fecha}
            </div>
            <div
                onClick={() => setObservaciones(!observaciones)}
                className="cursor-pointer inline"
            >
                <span className="border-b-2 border-custom-fourth">
                    Observaciones
                </span> <i className={`fa fa-chevron-${observaciones ? "up" : "down"}`}></i>
            </div>
            <div className={`mt-2 grid grid-cols-1 gap-3 ${observaciones || "hidden"}`}>
                <div>
                    {e.observaciones.map(e => (
                        <div>
                            <i className="fa fa-check mr-2"></i>
                            <span>{e}</span>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className="bg-custom-five hover:bg-custom-fourth px-4 py-1 rounded-sm font-semibold w-full"
                >Agregar
                </button>
            </div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="md:ml-24"
            >
                <DialogTitle id="alert-dialog-title">
                    <h3 className="border-b-2">Agregar Observacion</h3>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <input
                            value={nueva}
                            onChange={(e) => setNueva(e.target.value)}
                            className="input"
                            type="text"
                            placeholder="Nueva observación"
                        />
                        <button
                            onClick={submit}
                            className="bg-custom-five hover:bg-custom-fourth px-2 py-2 text-white"
                        >Continuar</button>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </main>
    )
}

const TerminarProyecto = ({ proyecto }) => {

    const navigate = useNavigate()

    const [terminar, { data, loading, error }] = useMutation(TERMINAR_PROYECTO)

    const [open, setOpen] = useState(false)

    const submit = () => {
        terminar({ variables: { _id: proyecto._id } })
    }

    useEffect(() => {
        if (data && data.terminarProyecto) {
            toast.success("Proyecto terminado correctamente")
            setOpen(false)
            navigate("/proyectos")
        }
    }, [data])

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-custom-five hover:bg-custom-fourth px-4 py-2 rounded-sm font-semibold relative top-4 w-full">{`Terminar proyecto`}<i className="fas fa-exclamation-triangle ml-2"></i>
            </button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="md:ml-24"
            >
                <DialogTitle id="alert-dialog-title">
                    <h3 className="border-b-2">{`Terminar el proyecto "${proyecto.nombre}"`}<i className="fas fa-exclamation-triangle"></i></h3>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`¿Está seguro que desea cambiar la fase del proyecto a terminado?`}
                        <div>
                            {"Una vez hecho el cambio el proyecto no podrá ser activado nuevamente."}
                        </div>
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
                                    className="bg-custom-five hover:bg-custom-fourth px-4 py-2 rounded-md font-semibold">Terminar</button>
                            </>
                        )
                    }
                </DialogActions>
            </Dialog>
        </>
    )

}


export default ProjectInfo
