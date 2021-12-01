import {gql} from '@apollo/client'

export const GET_USUARIOS = gql`
    query Usuarios {
        Usuarios {
        _id
        nombre
        apellido
        correo
        estado
        identificacion
        rol
        inscripciones{
            estado
        }
        }
    }
`;

export const GET_USUARIO = gql`

    query Usuario($_id:String!){
        Usuario(_id:$_id){
            _id
            nombre
            correo
            identificacion
            estado
            apellido
            rol
        }
    }

`