import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import { useParams, useNavigate } from 'react-router'
import { useUser } from '../../context/UserContext'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROYECTO } from '../../graphql/proyectos/queries';
import useFormData from '../../hooks/useFormData';
import Input from '../../components/Input';
import ButtonLoading from '../../components/ButtonLoading';
import toast from 'react-hot-toast';
import { ACTUALIZAR_PROYECTO, TERMINAR_PROYECTO } from '../../graphql/proyectos/mutations';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

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

    useEffect(() => {
        console.log("Data del proyecto:", data)
    }, [data])

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
        <div className="pb-7 text-white flex flex-col">
            <div className="py-12 px-10 bg-custom-third mt-8 md:mt-2 mx-4 rounded-md shadow-xl md:px-20 lg:mx-20 relative">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold my-4" >{data.Proyecto.nombre}</h1>
                <div className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">Estado actual - {data.Proyecto.estado}</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-semibold">Fase actual - {data.Proyecto.fase}</div>
                <i
                    className="fas fa-undo absolute text-4xl top-10 right-8 text-custom-five cursor-pointer hover:text-custom-fourth"
                    onClick={() => navigate(-1)}
                ></i>
                    <button
                        onClick={() => setShow(!show)}
                        className="bg-custom-five hover:bg-custom-fourth px-4 py-2 rounded-md font-semibold relative top-4 mr-2"
                    >
                        Actualizar datos
                    </button>
                    <div className={`inline ${data.Proyecto.fase === "TERMINADO" && "hidden"}`}>
                        <TerminarProyecto proyecto={data.Proyecto} />
                    </div>
            </div>
            <div className={`py-12 px-7 bg-custom-third mt-8 mx-4 rounded-md shadow-xl md:px-20 lg:mx-20 ${show || "hidden"}`}>
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
                                loading={false}
                                text='Confirmar'
                            />)
                    }
                </form>
            </div>
        </div>
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
            setTimeout(() => {
                window.location.reload()
            }, [500])
        }
    }, [data])

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-custom-five hover:bg-custom-fourth px-4 py-2 rounded-md font-semibold relative top-4">{`Terminar proyecto`}<i className="fas fa-exclamation-triangle ml-2"></i>
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
