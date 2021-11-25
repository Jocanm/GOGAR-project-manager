import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USUARIOS } from '../../graphql/usuarios/queries'
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';


const IndexUsuarios = () => {

    const { data, error, loading } = useQuery(GET_USUARIOS)

    useEffect(() => {
        console.log(data, loading, error);
    }, [data])

    if (loading) return (
        <div className="h-screen mx-auto flex items-center justify-center">
            <ReactLoading type="spin" height="20%" width="20%" />
        </div>
    )

    return (
        <section className="container mx-auto pt-6 md:p-6">
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
                        <tbody className="bg-white">
                            {
                                data.Usuarios.map(u => (
                                    <tr
                                    key={u._id}
                                    className="text-gray-700">
                                        <td className="px-4 py-3 border">
                                            <div className="flex items-center text-sm">
                                                <div>
                                                    <p className="font-semibold text-black">{u.nombre}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-ms font-semibold border">{u.apellido}</td>
                                        <td className="px-4 py-3 text-xs font-semibold border">{u.correo}</td>
                                        <td className="px-4 py-3 text-sm border">{u.identificacion}</td>
                                        <td className="px-4 py-3 text-ms font-semibold border">{u.rol}</td>
                                        <td className="px-4 py-3 text-ms font-semibold border">{u.estado}</td>
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
    )
}

export default IndexUsuarios
