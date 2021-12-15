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

export const CREAR_AVANCE = gql`
mutation CrearAvance($descripcion: String!, $proyecto: String!, $creadoPor: String!) {
  crearAvance(descripcion: $descripcion, proyecto: $proyecto, creadoPor: $creadoPor) {
  descripcion  
  }
}
`

export const EDITAR_DESCRIPCION = gql`
mutation EditarAvance($id: String!, $descripcion: String) {
  editarAvance(_id: $id, descripcion: $descripcion) {
    _id
    descripcion
  }
}
`