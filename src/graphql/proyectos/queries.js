import {gql} from '@apollo/client'

export const PROYECTOS_LIDER = gql`

    query Usuario($_id: String!) {
        Usuario(_id: $_id) {
        projectosLiderados {
            _id
            nombre
            presupuesto
            estado
            fase
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
        presupuesto
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

export const GET_PROYECTO = gql`

    query Proyecto($_id: String!) {
    Proyecto(_id: $_id) {
        _id
        nombre
        estado
        fase
        presupuesto
        inscripciones {
            _id
            estado
            estudiante {
                nombre
                apellido
                identificacion
                correo
            }
        }    
        avances {
            _id
            descripcion
            observaciones
        }  
    }
}
`;

export const GET_AVANCES = gql`

query Proyecto($_id: String!) {
  Proyecto(_id: $_id) {
  _id
  nombre
  estado
  fase
  avances {
    _id
    fecha
    descripcion
    observaciones
    creadoPor {
      _id
      nombre
      apellido
      correo
      identificacion
    }
  }  
  }
}

`