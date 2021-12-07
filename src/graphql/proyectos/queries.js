import {gql} from '@apollo/client'

export const PROYECTOS_LIDER = gql`

    query Usuario($_id: String!) {
        Usuario(_id: $_id) {
        projectosLiderados {
            _id
            nombre
            objetivos {
            descripcion
            tipo
                }
            }  
        }
    }
`;