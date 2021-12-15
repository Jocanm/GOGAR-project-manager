import {gql} from '@apollo/client'

export const CREAR_PROYECTO = gql`
    mutation CrearProyecto(
        $nombre: String!, 
        $presupuesto: Float!, 
        $lider: String!
    ) {
        crearProyecto(
            nombre: $nombre, 
            presupuesto: $presupuesto, 
            lider: $lider
        ) {
        lider {
            _id
        }
        _id
        nombre
        presupuesto
        estado
        fase
    }
}

`
export const APROBAR_PROYECTO = gql`

    mutation AprobarProyecto($_id: String!) {
        aprobarProyecto(_id: $_id) {
            _id
            nombre
            estado
            fase  
        }
    }
`
export const INACTIVAR_PROYECTO = gql`

    mutation InactivarProyecto($_id: String!) {
        inactivarProyecto(_id: $_id) {
            _id
            nombre
            estado
            fase
        }
    }

`
export const TERMINAR_PROYECTO = gql`
    mutation TerminarProyecto($_id: String!) {
        terminarProyecto(_id: $_id) {
            nombre
            _id  
        }
    }

`

export const ACTUALIZAR_PROYECTO = gql`
    mutation ActualizarProyecto($_id: String!, $nombre: String!, $presupuesto: Float!) {
        actualizarProyecto(_id: $_id, nombre: $nombre, presupuesto: $presupuesto) {
            _id
            nombre
        }
    }
`