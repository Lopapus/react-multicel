import * as yup from 'yup'

const SubcategoriaSchema = yup.object().shape({
  nombre: yup.string()
    .min(4, 'Mínimo 5 caracteres')
    .max(30, 'Excedió el maximo de 30 caracteres')
})

export default SubcategoriaSchema
