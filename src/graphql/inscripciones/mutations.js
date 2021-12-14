import {gql} from '@apollo/client'


export const CREAR_INSCRIPCION = gql`

    mutation CrearInscripcion($proyecto: String!, $estudiante: String!) {
        crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
            _id
            
        }
}`;

export const APROBAR_INSCRIPCION = gql`

    mutation AprobarInscripcion($_id: String!) {
        aprobarInscripcion(_id: $_id) {
            estado
            fechaIngreso  
        }
    }
`;