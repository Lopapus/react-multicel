import * as yup from 'yup'

const ModeloSchema = yup.object().shape({
  nombre: yup.string()
    .min(2, 'Mínimo 5 caracteres')
    .max(30, 'Excedió el maximo de 30 caracteres')
})

export default ModeloSchema
