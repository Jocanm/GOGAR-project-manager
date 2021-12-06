import {gql} from '@apollo/client'


export const CREAR_OBJETIVO = gql`

mutation CrearObjetivo(
    $descripcion: String!, $tipo: Enum_tipoObjetivo!, $proyecto: String!
) {
    crearObjetivo(
        descripcion: $descripcion, tipo: $tipo, proyecto: $proyecto
    ) {
        _id
        descripcion
        tipo
    }
}

`