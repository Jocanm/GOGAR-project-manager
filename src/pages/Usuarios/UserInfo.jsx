import { useMutation, useQuery } from '@apollo/client'
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { EDITAR_USUARIO } from '../../graphql/usuarios/mutations'
import { GET_USUARIO } from '../../graphql/usuarios/queries'
import useFormData from '../../hooks/useFormData'
import { Enum_EstadoUsuario } from '../../utils/enum'
import ReactLoading from 'react-loading'

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
            <div className="py-12 px-10 bg-custom-third mt-8 md:mt-2 mx-4 rounded-md shadow-xl md:px-20 md:mx-32">
                <span className="text-xl sm:text-3xl text-white font-semibold">Usuario:</span>
                <h1 className="text-xl sm:text-3xl text-white font-semibold my-4" >{usuario.nombre} {usuario.apellido} - {usuario.rol}</h1>
                <span className="text-xl sm:text-3xl text-white font-semibold">Estado actual - {usuario.estado}</span>
            </div>
            <div className="py-12 px-10 bg-custom-third mt-8 mx-4 rounded-md shadow-xl md:px-20 md:mx-32">
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
                        type={"text"}
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
                        loading={mutationLoading}
                        text='Confirmar'
                    />
                </form>
            </div>
        </div>
    )
}

const Input = ({ label, name, defaultValue, type }) => {
    return (
        <label htmlFor={name} className='flex flex-col my-3'>
            <span>{label}</span>
            <input
                required
                type={type}
                name={name}
                className='input'
                defaultValue={defaultValue}
            />
        </label>
    );
};

const DropDown = ({ label, name, defaultValue = '', required, options }) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const optionsSelect = [['', 'Seleccione una opción', true], ...Object.entries(options)];
    useEffect(() => {
        setSelectedValue(defaultValue);
    }, [defaultValue]);
    return (
        <label htmlFor={name} className='flex flex-col my-3'>
            <span>{label}</span>
            <select
                required={required}
                name={name}
                className='input'
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
            >
                {optionsSelect.map((o) => {
                    return (
                        <option key={nanoid()} value={o[0]} disabled={o[2] ?? false}>
                            {o[1]}
                        </option>
                    );
                })}
            </select>
        </label>
    );
};

const ButtonLoading = ({ disabled, loading, text }) => {
    return (
        <button
            disabled={disabled}
            type='submit'
            className='bg-indigo-700 text-white font-bold text-lg py-3 px-6  rounded-xl hover:bg-indigo-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700'
        >
            {loading ? <ReactLoading type='spin' height={30} width={30} /> : text}
        </button>
    );
};

export default UserInfo
