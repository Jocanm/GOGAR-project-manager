import {
    gql
} from '@apollo/client'

export const REGISTRO = gql `

    mutation Registro(
        $nombre: String! 
        $apellido: String! 
        $identificacion: String! 
        $correo: String!
        $rol: Enum_Rol! 
        $password: String!
        ) {
        Registro(
            nombre: $nombre 
            apellido: $apellido 
            identificacion: $identificacion 
            correo: $correo 
            rol: $rol 
            password: $password
            ){
                token
                error
            }
        }
`

export const LOGIN = gql `

    mutation Login($correo: String!, $password: String!) {
        Login(correo: $correo, password: $password) {
            token
            error
        }
    }
`;

export const REFRESCAR_TOKEN = gql `

    mutation RefrescarToken {
        RefrescarToken {
            token
            error
        }
}

`