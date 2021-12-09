import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import { EDITAR_USUARIO } from '../../graphql/usuarios/mutations'
import { GET_USUARIO } from '../../graphql/usuarios/queries'
import { Enum_EstadoUsuario, Enum_EstadoUsuarioLider } from '../../utils/enum'
import useFormData from '../../hooks/useFormData'
import Input, { Input2 } from '../../components/Input'
import DropDown from '../../components/DropDown'
import ButtonLoading from '../../components/ButtonLoading'
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router'
import { useUser } from '../../context/UserContext'

const UserInfo = () => {

    const navigate = useNavigate()

    const { userData } = useUser()

    const [show, setShow] = useState(false)

    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams()

    const { data, loading, error } = useQuery(GET_USUARIO, {
        variables: { _id }
    })

    const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_USUARIO);

    const [usuario, setUsuario] = useState({})

    const [wrong, setWrong] = useState(false)

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
            navigate("/home")
        }
    }, [mutationData])

    const submitForm = (e) => {
        e.preventDefault()
        if (!show) {
            delete formData.password
            console.log('fd', formData)
            editarUsuario({
                variables: { _id, ...formData }
            });
        } else {
            if (formData.password.length < 4) {
                setWrong(true)
            } else {
                console.log('fd', formData)
                editarUsuario({
                    variables: { _id, ...formData }
                })
            }
        }
    }

    if (loading) return (
        <div className="h-screen mx-auto flex items-center justify-center">
            <ReactLoading type="spin" height="20%" width="20%" />
        </div>
    )

    return (
        <div className="pb-7">
            <div className="py-12 px-10 bg-custom-third mt-8 md:mt-2 mx-4 rounded-md shadow-xl md:px-20 lg:mx-20 relative">
                <span className="text-xl sm:text-2xl lg:text-3xl text-white font-semibold">Usuario:</span>
                <h1 className="text-xl sm:text-2xl lg:text-3xl text-white font-semibold my-4" >{usuario.nombre} {usuario.apellido} - {usuario.rol}</h1>
                <span className="text-xl sm:text-2xl lg:text-3xl text-white font-semibold">Estado actual - {usuario.estado}</span>
                <i
                    className="fas fa-undo absolute text-4xl top-10 right-8 text-custom-five cursor-pointer hover:text-custom-fourth"
                    onClick={() => navigate(-1)}
                ></i>
            </div>
            <div className="py-12 px-10 bg-custom-third mt-8 mx-4 rounded-md shadow-xl md:px-20 lg:mx-20">
                <h2 className="text-xl sm:text-2xl lg:text-3xl text-white font-semibold my-4">{`${userData._id === data.Usuario._id?"Actualiza tu información personal:":"Actualizar Información del usuario:"}`}</h2>
                <form
                    onSubmit={submitForm}
                    onChange={updateFormData}
                    ref={form}
                    className="flex flex-col">
                    <div className={`${userData._id === data.Usuario._id || "hidden"}`}>
                        <Input
                            label="Nombre"
                            name="nombre"
                            defaultValue={usuario.nombre}
                            type={"text"}
                        />
                        <Input
                            label="Apellido"
                            name="apellido"
                            defaultValue={usuario.apellido}
                            type={"text"}
                        />
                        <Input
                            label="Correo"
                            name="correo"
                            defaultValue={usuario.correo}
                            type={"email"}
                        />
                        <Input
                            label="Identificacion"
                            name="identificacion"
                            defaultValue={usuario.identificacion}
                            type={"text"}
                        />
                    </div>
                    <div
                        className={`${userData._id === data.Usuario._id && "hidden"}`}>
                        <DropDown
                            label='Estado de la persona'
                            name='estado'
                            defaultValue={usuario.estado}
                            required={true}
                            options={userData.rol === "ADMINISTRADOR" ? Enum_EstadoUsuario : Enum_EstadoUsuarioLider}
                        />
                    </div>
                    <div className={`${show ? "block" : "hidden"} animate__animated animate__fadeIn animate__faster`}>
                        <Input2
                            label="Nueva contraseña"
                            name="password"
                            defaultValue={""}
                            type="password"
                        />
                    </div>
                    <div
                        className={`text-center mb-5 font-bold text-red-400 border-b-2 border-red-500 ${wrong || "hidden"} animate__animated animate__fadeIn animate__faster`}
                    >La contraseña debe tener minimo cuatro caracteres</div>
                    <button
                        type="button"
                        onClick={() => {
                            setShow(!show)
                        }}
                        className={`bg-custom-five hover:bg-custom-fourth text-white font-bold px-4 py-2 rounded ${userData._id === data.Usuario._id || "hidden"}`}>{show ? "Deshacer" : "Cambiar contraseña"}
                    </button>
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
