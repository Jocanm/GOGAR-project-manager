import {gql} from '@apollo/client'

export const EDITAR_USUARIO = gql`

mutation EditarUsuario(
    $_id: String! 
    $nombre: String! 
    $apellido: String! 
    $identificacion: String! 
    $correo: String! 
    $estado: Enum_estadoUsuario!
    $password: String
    ) {
    editarUsuario(
        _id: $_id 
        nombre: $nombre 
        apellido: $apellido 
        identificacion: $identificacion 
        correo: $correo 
        estado: $estado
        password: $password
        ) {
            _id
            nombre
            apellido
            correo
            estado
            identificacion
            rol
    }
}

`