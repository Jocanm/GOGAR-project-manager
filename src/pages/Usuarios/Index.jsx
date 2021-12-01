import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USUARIOS } from '../../graphql/usuarios/queries'
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';


const IndexUsuarios = () => {

    const { data, error, loading } = useQuery(GET_USUARIOS)

    const [busqueda,setBusqueda] = useState("")
    const [dataFiltrada,setDataFiltrada] = useState([])

    useEffect(()=>{
        if(data && data.Usuarios){
            setDataFiltrada(data.Usuarios.filter((e)=>{
                return JSON.stringify(e).toLowerCase().includes(busqueda.toLowerCase())
            }))
        }
    },[busqueda,data])

    if (loading) return (
        <div className="h-screen mx-auto flex items-center justify-center">
            <ReactLoading type="spin" height="20%" width="20%" />
        </div>
    )

    return (
        <PrivateRoute roleList={["LIDER","ADMINISTRADOR"]}>
            <div className="bg-white mt-3 relative mx-auto rounded-lg container">
                <i className="fas fa-search absolute top-4 left-3 text-gray-600"></i>
                <input 
                onChange={e=>setBusqueda(e.target.value)}
                value={busqueda}
                className="input-s"
                placeholder="Busca un usuario"
                type="text" />
            </div>
            <section className="container mx-auto pt-6 xl:p-6 xl:hidden">
                <div className="w-full overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                    <th className="px-4 py-3">NOMBRE</th>
                                    <th className="px-4 py-3">CORREO</th>
                                    <th className="px-4 py-3">ROL</th>
                                    <th className="px-4 py-3">ESTADO</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white animate__animated animate__fadeIn animate__faster">
                                {
                                    dataFiltrada.map(u => (
                                        <tr
                                            key={u._id}
                                            className="text-gray-700 cursor-pointer">
                                            <td className="flex px-4 py-3 border font-semibold capitalize text-sm">
                                                <Link to={`${u._id}`}>
                                                    <span>{u.nombre} {u.apellido}</span>
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-xs font-semibold border">
                                                <Link to={`${u._id}`}>
                                                    {u.correo}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-semibold border lowercase">
                                                <Link to={`${u._id}`}>
                                                    {u.rol}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-semibold border lowercase">
                                                <Link to={`${u._id}`}>
                                                    {u.estado}
                                                </Link>
                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section className="hidden xl:block container mx-auto pt-6 md:p-">
                <div className="w-full overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                    <th className="px-4 py-3">NOMBRE</th>
                                    <th className="px-4 py-3">APELLIDOS</th>
                                    <th className="px-4 py-3">CORREO</th>
                                    <th className="px-4 py-3">IDENTIFICACION</th>
                                    <th className="px-4 py-3">ROL</th>
                                    <th className="px-4 py-3">ESTADO</th>
                                    <th className="px-4 py-3">EDITAR</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white animate__animated animate__fadeIn animate__faster">
                                {
                                    dataFiltrada.map(u => (
                                        <tr
                                            key={u._id}
                                            className="text-gray-700">
                                            <td className="flex px-4 py-3 border font-semibold capitalize">
                                                <span>{u.nombre}</span>
                                            </td>
                                            <td className="px-4 py-3 text-ms font-semibold border capitalize">{u.apellido}</td>
                                            <td className="px-4 py-3 text-xs font-semibold border">{u.correo}</td>
                                            <td className="px-4 py-3 text-sm border">{u.identificacion}</td>
                                            <td className="px-4 py-3 text-ms font-semibold border lowercase">{u.rol}</td>
                                            <td className="px-4 py-3 text-ms font-semibold border lowercase">{u.estado}</td>
                                            <td className="px-4 py-3 text-ms font-semibold border text-center">
                                                <Link to={`${u._id}`}>
                                                    <i className="far fa-edit cursor-pointer"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </PrivateRoute>
    )
}

export default IndexUsuarios
