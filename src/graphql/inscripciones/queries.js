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

export const GET_INSCRIPCION = gql`

  query Inscripcion($estudiante: String!, $proyecto: String!) {
  Inscripcion(estudiante: $estudiante, proyecto: $proyecto) {
  _id
  estado  
  proyecto {
    nombre
  }
  estudiante {
    nombre
  }
  }
}

`