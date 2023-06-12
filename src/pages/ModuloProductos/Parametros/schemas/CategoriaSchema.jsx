import * as yup from 'yup'

const CategoriaSchema = yup.object().shape({
  nombre: yup.string()
    .min(2, 'Mínimo 2 caracteres')
    .max(30, 'Excedió el maximo de 30 caracteres')
})

export default CategoriaSchema
