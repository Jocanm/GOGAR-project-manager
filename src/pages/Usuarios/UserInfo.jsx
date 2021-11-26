import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import { EDITAR_USUARIO } from '../../graphql/usuarios/mutations'
import { GET_USUARIO } from '../../graphql/usuarios/queries'
import { Enum_EstadoUsuario } from '../../utils/enum'
import useFormData from '../../hooks/useFormData'
import Input from '../../components/Input'
import DropDown from '../../components/DropDown'
import ButtonLoading from '../../components/ButtonLoading'

const UserInfo = () => {

    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams()

    const { data, loading, error } = useQuery(GET_USUARIO, {
        variables: { _id }
    })

    const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_USUARIO);

    const [usuario, setUsuario] = useState({})

    useEffect(() => {
        if (loading) console.log("Cargando");
        else {
            console.log(data)
            setUsuario(data.Usuario)
            console.log("Usuario: ", usuario)
        }
    }, [data, loading])

    useEffect(() => {
        if (mutationError) {
            alert("Error modificando el usuario")
        }
        if (error) {
            alert("Error consultando al usuario")
        }
    }, [error, mutationError])

    useEffect(() => {
        if (mutationData) {
            alert("Usuario modificado con exito!")
        }
    }, [mutationData])

    const submitForm = (e) => {
        e.preventDefault()
        console.log('fd', formData)
        editarUsuario({
            variables:{_id,...formData}
        });
    }

    if (loading) return (
        <h1 className="text-6xl">Loading....</h1>
    )

    return (
        <div className="pb-7">
            <div className="py-12 px-10 bg-custom-third mt-8 md:mt-2 mx-4 rounded-md shadow-xl md:px-20 lg:mx-20">
                <span className="text-xl sm:text-3xl text-white font-semibold">Usuario:</span>
                <h1 className="text-xl sm:text-3xl text-white font-semibold my-4" >{usuario.nombre} {usuario.apellido} - {usuario.rol}</h1>
                <span className="text-xl sm:text-3xl text-white font-semibold">Estado actual - {usuario.estado}</span>
            </div>
            <div className="py-12 px-10 bg-custom-third mt-8 mx-4 rounded-md shadow-xl md:px-20 lg:mx-20">
                <h2 className="text-xl sm:text-3xl text-white font-semibold my-4">Actualizar Información del usuario</h2>
                <form
                    onSubmit={submitForm}
                    onChange={updateFormData}
                    ref={form}
                    className="flex flex-col">
                    <Input
                        label="Nombre:"
                        name="nombre"
                        defaultValue={usuario.nombre}
                        type={"text"}
                    />
                    <Input
                        label="Apellido:"
                        name="apellido"
                        defaultValue={usuario.apellido}
                        type={"text"}
                    />
                    <Input
                        label="Correo:"
                        name="correo"
                        defaultValue={usuario.correo}
                        type={"email"}
                    />
                    <Input
                        label="Identificacion:"
                        name="identificacion"
                        defaultValue={usuario.identificacion}
                        type={"text"}
                    />
                    <DropDown
                        label='Estado de la persona:'
                        name='estado'
                        defaultValue={usuario.estado}
                        required={true}
                        options={Enum_EstadoUsuario}
                    />
                    <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={false}
                        text='Confirmar'
                    />
                </form>
            </div>
        </div>
    )
}

export default UserInfo
