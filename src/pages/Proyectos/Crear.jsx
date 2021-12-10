import React, { useEffect, useState } from 'react'
import useFormData from '../../hooks/useFormData'
import Input from '../../components/Input'
import ButtonLoading from '../../components/ButtonLoading'
import { useUser } from '../../context/UserContext'
import { useMutation } from '@apollo/client'
import { CREAR_PROYECTO } from '../../graphql/proyectos/mutations'
import { useNavigate } from 'react-router'
import { CREAR_OBJETIVO } from '../../graphql/objetivos/mutation'
import PrivateRoute from '../../components/PrivateRoute'
import toast from 'react-hot-toast'

const Crear = () => {

    const navigate = useNavigate()
    const { userData } = useUser()

    const { form, formData, updateFormData } = useFormData()

    const [crearProyecto, { data, loading, error }] = useMutation(CREAR_PROYECTO)
    const [crearObjetivo, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(CREAR_OBJETIVO)

    const [especificos, setEspecificos] = useState([1])

    const submitForm = async (e) => {
        e.preventDefault()

        await crearProyecto({
            variables: {
                nombre: formData.nombre,
                lider: userData._id,
                presupuesto: Number(formData.presupuesto)
            }
        })
    }

    useEffect(() => {
        if (data && data.crearProyecto) {
            crearObjetivo({
                variables: {
                    descripcion: formData.general,
                    tipo: "GENERAL",
                    proyecto: data.crearProyecto._id
                }
            })

            especificos.forEach((e, i) => {
                crearObjetivo({
                    variables: {
                        tipo: "ESPECIFICO",
                        proyecto: data.crearProyecto._id,
                        descripcion: formData[`especifico${i + 1}`]
                    }
                })
            })
        }
    }, [data])

    useEffect(() => {
        console.log(data)
        if (data && mutationData) {
            if (data.crearProyecto && mutationData.crearObjetivo) {
                navigate("/proyectos")
                toast.success("Proyecto creado")
            }
        }
    }, [data, mutationData, navigate])

    useEffect(() => {
        console.log(especificos)
    }, [especificos])

    return (
        <PrivateRoute roleList={["LIDER"]}>
            <div className="container mx-auto flex flex-col items-center justify-center md:max-w-none">
                <form
                    onChange={updateFormData}
                    onSubmit={submitForm}
                    ref={form}
                    className="bg-white px-6 py-8 rounded shadow-md text-black w-full md:w-2/3 md:px-5">
                    <h1 className="mb-8 text-3xl text-center">Crea un nuevo proyecto</h1>
                    <div className="grid grid-cols-1 gap-0">
                        <Input
                            name="nombre"
                            type="text"
                            placeholder="Nombre del proyecto"
                            required
                        />
                        <Input
                            name="presupuesto"
                            type="number"
                            placeholder="Presupuesto"
                            required
                        />
                        <Input
                            name="general"
                            type="text"
                            placeholder="Objetivo general"
                            required
                        />
                        {
                            especificos.map((e, i) => (
                                <Input
                                    name={`especifico${i + 1}`}
                                    type="text"
                                    placeholder={`Objetivo especifico ${i + 1}`}
                                    required
                                />
                            ))
                        }
                        <button
                            type="button"
                            onClick={() => setEspecificos([...especificos, especificos.length + 1])}
                            className="px-4 py-2 bg-custom-five hover:bg-custom-fourth rounded-md text-white font-bold">
                            Agregar otro objetivo especifico
                        </button>
                    </div>
                    <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={false}
                        text='Crear'
                    />
                </form>
            </div>
        </PrivateRoute>
    )
}

export default Crear
