import {
    gql
} from '@apollo/client'


export const GET_INSCRIPCIONES = gql `

query InscripcionesEstudiante($_id: String!) {
  inscripcionesEstudiante(_id: $_id) {
    estado
  proyecto {
    _id
    nombre
    presupuesto
    objetivos {
      _id
      descripcion
      tipo
    }
    estado
    fase
    lider {
      _id
      nombre
      apellido
      rol
    }
  }
  }
}


`