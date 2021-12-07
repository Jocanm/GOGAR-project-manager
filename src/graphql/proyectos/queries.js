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
            lider {
                nombre
                apellido
                }
            }  
        }
    }
`;

export const GET_PROYECTOS = gql`

query Proyectos {
    Proyectos {
        _id
        nombre
        estado
        fase
        objetivos {
            tipo
            descripcion
        }
    lider {
        _id
        nombre
        apellido
        }
    }
}

`