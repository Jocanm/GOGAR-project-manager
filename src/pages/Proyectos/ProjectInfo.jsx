import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import { useParams, useNavigate } from 'react-router'
import { useUser } from '../../context/UserContext'
import { useMutation, useQuery } from '@apollo/client'
<<<<<<< HEAD
import { GET_AVANCES, GET_PROYECTO } from '../../graphql/proyectos/queries';
=======
import { GET_PROYECTO } from '../../graphql/proyectos/queries';
import { GET_INSCRIPCIONES} from '../../graphql/inscripciones/queries';
>>>>>>> daniel_incripciones
import useFormData from '../../hooks/useFormData';
import Input from '../../components/Input';
import ButtonLoading from '../../components/ButtonLoading';
import toast from 'react-hot-toast';
import { TERMINAR_PROYECTO } from '../../graphql/proyectos/mutations';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { APROBAR_INSCRIPCION } from '../../graphql/inscripciones/mutations';
import { AGREGAR_OBSERVACIONES, CREAR_AVANCE, EDITAR_DESCRIPCION } from '../../graphql/avances/mutation';
import { nanoid } from 'nanoid';


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

    const navigate = useNavigate()
    const { userData } = useUser()
    const [value, setValue] = useState("")
    const [change, setChange] = useState(false)
    const { data, loading } = useQuery(GET_PROYECTO, {
        variables: { _id }
    })
    const [crearAvance, { data: mutationData, loading: mutationLoading }] = useMutation(CREAR_AVANCE)

    const submit = () => {
        if (value.length >= 4) {
            crearAvance({
                variables: {
                    descripcion: value,
                    proyecto: _id,
                    creadoPor: userData._id
                }
            })
        } else {
            toast.error("La descripcion del avance debe tener 4 caracteres como minimo")
        }
    }

    useEffect(() => {
        if (mutationData && mutationData.crearAvance) {
            toast.success("Avance creado correctamente")
            setValue("")
            setChange(!change)
        }
    }, [mutationData])

    if (loading) {
        return (
            <div className="h-screen mx-auto flex items-center justify-center">
                <ReactLoading type="spin" height="17%" width="17%" />
            </div>
        )
    }

    return (
        <div className="text-white flex flex-col">
            <div className="py-12 px-10 bg-custom-third mt-8 md:mt-2 mx-4 rounded-md shadow-xl md:px-16 lg:mx-20 relative grid gap-3">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold uppercase" >{data.Proyecto.nombre}</h1>
                <div className="text-xl sm:text-2xl lg:text-3xl font-semibold">Estado actual - {data.Proyecto.estado}</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-semibold">Fase actual - {data.Proyecto.fase}</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-semibold">Presupuesto - {data.Proyecto.presupuesto}$</div>
                <i
                    className="fas fa-undo absolute text-4xl top-10 right-8 text-custom-five cursor-pointer hover:text-custom-fourth"
                    onClick={() => navigate(-1)}
                ></i>
            </div>
            <div className="py-8 px-10 bg-custom-third mt-8 md:mt-2 mx-4 rounded-md shadow-xl md:px-16 lg:mx-20 relative">
                <h1 className="text-2xl text-center font-bold shadow">Avances</h1>
                <label className="mt-2 block rounded-sm">
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="outline-none px-1 py-1 text-gray-900 w-9/12 lg:w-3/4 rounded-tl rounded-bl"
                        placeholder="Descripción"
                        type="text" />
                    <button
                        onClick={submit}
                        className="px-2 py-1 rounded-tr rounded-br bg-custom-five hover:bg-custom-fourth mt-2 lg:w-3/12">Agregar</button>
                </label>
                <Avances
                    change={change}
                    _id={_id} />
            </div>
        </div>
    )

}

const ProjectInfoLider = ({ _id }) => {

    const navigate = useNavigate()

    const { data, loading, error } = useQuery(GET_PROYECTO, {
        variables: { _id }
    })

    const [show, setShow] = useState(false)
    const [showInscrip,setShowInscrip] = useState(false)

    const { form, formData, updateFormData } = useFormData(null)

    const submitForm = (e) => {
        e.preventDefault()
        toast.success("Editado")
    }

    if (loading) {
        return (
            <div className="h-screen mx-auto flex items-center justify-center">
                <ReactLoading type="spin" height="20%" width="20%" />
            </div>
        )
    }

    return (
<<<<<<< HEAD
        <div className="text-white flex flex-col">
            <div className="py-12 px-10 bg-custom-third mt-8 md:mt-2 mx-4 rounded-sm shadow-xl md:px-16 lg:mx-20 relative">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold my-4 uppercase" >{data.Proyecto.nombre}</h1>
=======
        <div className="pb-7 text-white flex flex-col">
            <div className="py-12 px-10 bg-custom-third mt-8 md:mt-2 mx-4 rounded-md shadow-xl md:px-16 lg:mx-20 relative">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold my-4" >{data.Proyecto.nombre}</h1>
>>>>>>> daniel_incripciones
                <div className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">Estado actual - {data.Proyecto.estado}</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-semibold">Fase actual - {data.Proyecto.fase}</div>
                <i
                    className="fas fa-undo absolute text-4xl top-10 right-8 text-custom-five cursor-pointer hover:text-custom-fourth"
                    onClick={() => navigate(-1)}
                ></i>
<<<<<<< HEAD
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
=======
                <div className="flex">
                    <button
                        onClick={() => setShow(!show)}
                        className="bg-white hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-md font-semibold relative top-4 mr-2 w-full"
                    >
                        Actualizar datos
                    </button>
                    <div className={`inline ${data.Proyecto.fase === "TERMINADO" && "hidden"} w-full`}>
                        <TerminarProyecto proyecto={data.Proyecto} />
                    </div>
                </div>
            </div>
            <div className="px-10 py-5 bg-custom-third mt-6 mx-4 rounded-md shadow-xl md:px-16 lg:mx-20 flex text-gray-900">
                <button 
                onClick={()=>setShowInscrip(!showInscrip)}
                className="bg-white mr-2 hover:bg-gray-300 px-4 py-2 rounded-md font-semibold w-full">
                    Ver inscripciones
                </button>
                <button className="bg-white hover:bg-gray-300 px-4 py-2 rounded-md font-semibold w-full">
                    Ver Avances
                </button>
>>>>>>> daniel_incripciones
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
                    <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={false}
                        text='Confirmar'
                    />
                    {/* {
                        mutationLoading ?
                            (<div className="w-full mx-auto flex items-center justify-center">
                                <ReactLoading type="spin" height="7%" width="7%" color='#FF4C29' />
                            </div>) :
                            (<ButtonLoading
                                disabled={Object.keys(formData).length === 0}
                                loading={mutationLoading}
                                text='Confirmar'
                            />)
                    } */}
                </form>
            </div>
<<<<<<< HEAD
            <MainInfo _id={_id} />
=======
            {
                showInscrip&&(<Inscripciones _id={_id}/>)
            }
>>>>>>> daniel_incripciones
        </div>
    )
}

<<<<<<< HEAD
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
=======
const Inscripciones = ({_id}) => {

    //Aqui va el codigo que hace una busqueda de todas las inscripciones que tiene un proyecto
    //El componente recibe el id del proyecto y se tiene que hacer un query a ese proyecto y traer todas las inscripciones


    const { data} = useQuery(GET_INSCRIPCIONES, {
        variables: { _id }
    })

    useEffect(() => {
        console.log("Incripciones del proyecto:", data)
    }, [data])

    return (
        <div className="px-10 py-5 bg-custom-third mt-6 mx-4 rounded-md shadow-xl md:px-16 lg:mx-20 text-white">
            lista de inscripciones
>>>>>>> daniel_incripciones
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

const Avances = ({ _id, change = false }) => {

    const { userData } = useUser()
    const { data, loading, refetch } = useQuery(GET_AVANCES, {
        variables: { _id }
    })
    const [busqueda, setBusqueda] = useState("")
    const [dataFiltrada, setDataFiltrada] = useState([])

    useEffect(() => {
        refetch()
    }, [change, refetch])

    useEffect(() => {
        if (data && data.Proyecto) {
            setDataFiltrada(data.Proyecto.avances.filter(e => e.creadoPor.identificacion.startsWith(busqueda) || e.creadoPor.nombre.toLocaleLowerCase().startsWith(busqueda.toLocaleLowerCase())))
        }
    }, [busqueda, data])

    if (loading) {
        return (
            <div className="mx-auto flex items-center justify-center">
                <ReactLoading type="spin" height="10%" width="10%" />
            </div>
        )
    }

    return (
        <div>
            {
                userData.rol === "LIDER" ?
                    (
                        <input
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className={`input text-gray-900`}
                            type="text"
                            placeholder="Busca por estudiante (ID o nombre)" />
                    ) :
                    (<></>)
            }
            <section className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
                {
                    dataFiltrada.map(e => (
                        <AvanceItem key={e._id} e={e} refetch={refetch} />
                    ))
                }
            </section>
        </div>
    )
}

const AvanceItem = ({ e, refetch }) => {

    const { userData } = useUser()
    const [nueva, setNueva] = useState("")
    const [open, setOpen] = useState(false)
    const [observaciones, setObservaciones] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [value, setValue] = useState(e.descripcion)

    const [agregarObs, { data, loading }] = useMutation(AGREGAR_OBSERVACIONES)
    const [editarDesc,{data: mutationData, loading: mutationLoading}] = useMutation(EDITAR_DESCRIPCION)

    const submit = () => {
        agregarObs({ variables: { id: e._id, observaciones: [...e.observaciones, nueva] } })
    }

    const submitDesc = () => {
        editarDesc({variables: {
            id:e._id,
            descripcion:value
        }})
    }

    useEffect(() => {
        if(mutationData && mutationData.editarAvance){
            toast.success("Avance editado correctamente")
            refetch()
            setShowInput(false)
            setValue(e.descripcion)
        }
    },[mutationData])

    useEffect(() => {
        if (data && data.editarAvance) {
            toast.success("Observacion agregada correctamente!")
            setOpen(false)
            refetch()
        }
    }, [data, refetch])

    return (
        <main className="bg-white text-gray-900 p-2 rounded-sm overflow-y-auto relative">
            <i
                onClick={() => setShowInput(!showInput)}
                className={`fas fa-${showInput ? "times text-lg top-1" : "edit"} absolute right-2 ${userData._id !== e.creadoPor._id && "hidden"} cursor-pointer`}></i>
            <p className="capitalize">
                {e.creadoPor.nombre} {e.creadoPor.apellido} - {e.creadoPor.identificacion}
            </p>
            <span className="font-bold block">Aporte: </span>
            {
                showInput ?
                    (
                        <label className="">
                            <input
                            className="outline-none rounded-sm border-2"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            type="text" />
                            <button 
                            onClick={submitDesc}
                            className="bg-custom-five hover:bg-custom-fourth px-1 border-2 border-custom-fourth"><i className="fas fa-check"></i></button>
                        </label>
                    ) :
                    (
                        <div className={`${showInput && "hidden"}`}>{e.descripcion}</div>
                    )
            }
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
                        <div
                            key={nanoid()}
                        >
                            <i className="fa fa-check mr-2"></i>
                            <span>{e}</span>
                        </div>
                    ))}
                </div>
                {
                    userData.rol !== "LIDER" ?
                        (<></>) :
                        (
                            <button
                                onClick={() => setOpen(true)}
                                className="bg-custom-five hover:bg-custom-fourth px-4 py-1 rounded-sm font-semibold w-full"
                            >Agregar
                            </button>
                        )
                }
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
<<<<<<< HEAD
                className="bg-custom-five hover:bg-custom-fourth px-4 py-2 rounded-sm font-semibold relative top-4 w-full">{`Terminar proyecto`}<i className="fas fa-exclamation-triangle ml-2"></i>
=======
                className="bg-white hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-md font-semibold relative top-4 w-full">{`Terminar proyecto`}<i className="fas fa-exclamation-triangle ml-2"></i>
>>>>>>> daniel_incripciones
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
