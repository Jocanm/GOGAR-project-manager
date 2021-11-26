import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import ButtonLoading from '../../components/ButtonLoading'
import Input from '../../components/Input'
import { useAuthContext } from '../../context/AuthContext'
import { LOGIN } from '../../graphql/auth/mutations'
import useFormData from '../../hooks/useFormData'

const Login = () => {

    const { form, formData, updateFormData } = useFormData()

    const { setToken } = useAuthContext()

    const [login, { data, loading, error: mutationError }] = useMutation(LOGIN)

    const navigate = useNavigate()

    const submitForm = (e) => {
        e.preventDefault()

        login({ variables: formData })
    }

    const [error, setError] = useState(false)

    useEffect(() => {

        if (data) {
            if (data.Login.token) {
                setToken(data.Login.token)
                navigate("/app/usuarios")
                console.log("Redirigiendo")
            }
        }

        if (data && data.Login.error) {
            setError(true)
        }

    }, [data, navigate, setToken, loading])

    return (
        <div>
            <div className="min-h-screen flex flex-col mt-11">
                <div className="container max-w-sm mx-auto flex flex-col items-center justify-center px-2 md:max-w-none">
                    <form
                        onChange={updateFormData}
                        onSubmit={submitForm}
                        ref={form}
                        className={`bg-white px-6 py-8 rounded shadow-md text-black w-full md:w-2/3 md:px-5 ${error && "wrong"}`}>
                        <h1 className="mb-8 text-3xl text-center">Inicia sesión</h1>
                        <div className="md:grid grid-cols-1">
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
                        <section className={`text-red-600 mb-2 ${error || "hidden"}`}>
                            Ups! Parece que el usuario o la contraseña son incorrectos :(
                        </section>
                        <ButtonLoading
                            disabled={Object.keys(formData).length === 0}
                            loading={false}
                            text='Confirmar'
                        />
                    </form>

                    <div className="text-white mt-6">
                        ¿No tienes una cuenta?
                        <Link to="/auth/registro">
                            <span className="no-underline border-b border-blue ml-1" href="../login/">
                                Registrate
                            </span>.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
