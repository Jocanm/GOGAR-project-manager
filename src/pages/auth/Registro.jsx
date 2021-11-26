import { useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import ButtonLoading from '../../components/ButtonLoading'
import DropDown from '../../components/DropDown'
import Input from '../../components/Input'
import { useAuthContext } from '../../context/AuthContext'
import { REGISTRO } from '../../graphql/auth/mutations'
import useFormData from '../../hooks/useFormData'
import { Enum_Rol } from '../../utils/enum'

const Registro = () => {

    const { form, formData, updateFormData } = useFormData()

    const {setToken} = useAuthContext() 

    const [registro, { data, loading, error }] = useMutation(REGISTRO);

    const navigate = useNavigate()

    const submitForm = (e) => {
        e.preventDefault()
        registro({ variables: formData })
    }


    useEffect(() => {
        console.log("data", data)
        if (data) {
            if (data.Registro.token) {
                setToken(data.Registro.token)
                navigate('/app/usuarios')
            }
        }
    }, [data])

    return (
        <div className="min-h-screen flex flex-col mt-11">
            <div className="container max-w-sm mx-auto flex flex-col items-center justify-center px-2 md:max-w-none">
                <form
                    onChange={updateFormData}
                    onSubmit={submitForm}
                    ref={form}
                    className="bg-white px-6 py-8 rounded shadow-md text-black w-full md:w-2/3 md:px-5">
                    <h1 className="mb-8 text-3xl text-center">Registrate</h1>
                    <div className="md:grid grid-cols-2 gap-4">
                        <Input
                            name="nombre"
                            type="text"
                            placeholder="Nombre"
                            required
                        />
                        <Input
                            name="apellido"
                            type="text"
                            placeholder="Apellido"
                            required
                        />
                        <Input
                            name="identificacion"
                            type="text"
                            placeholder="Identificacion"
                            required
                        />
                        <DropDown
                            name="rol"
                            required={true}
                            options={Enum_Rol}
                        />
                        <Input
                            name="correo"
                            type="email"
                            placeholder="Correo"
                            required
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                            required
                        />
                    </div>
                    <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={loading}
                        text='Confirmar'
                    />
                </form>
                <div className="text-white mt-6">
                    ¿Ya tienes una cuenta?
                    <Link to="/auth/login">
                        <span className="no-underline border-b border-blue ml-1" href="../login/">
                            Inicia sesión
                        </span>.
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Registro
