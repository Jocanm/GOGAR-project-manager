import React from 'react'
import useFormData from '../../hooks/useFormData'
import Input from '../../components/Input'
import DropDown from '../../components/DropDown'
import { Enum_Rol } from '../../utils/enum'
import ButtonLoading from '../../components/ButtonLoading'

const Crear = () => {

    const { form, formData, updateFormData } = useFormData()

    const submitForm = (e) =>{ 
        e.preventDefault()
    }


    return (
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
                        loading={false}
                        text='Confirmar'
                    />
                </form>
            </div>
    )
}

export default Crear
