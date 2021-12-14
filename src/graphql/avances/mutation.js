import {gql} from '@apollo/client'


export const AGREGAR_OBSERVACIONES = gql`

    mutation EditarAvance($id: String!, $observaciones: [String]) {
        editarAvance(_id: $id, observaciones: $observaciones) {
            _id
            descripcion
        }
    }
`

export const EDITAR_AVANCE = gql`

    mutation EditarAvance($id: String!, $descripcion: String) {
        editarAvance(_id: $id, descripcion: $descripcion) {
            descripcion
            observaciones
        }
    }

`