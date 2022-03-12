import * as yup from 'yup'

const formCreateSchema = yup.object().shape({
  nombre: yup.string()
    .min(4, 'Mínimo 4 caracteres')
    .required('Campo requerido'),
  usuario: yup.string()
    .min(8, 'Mínimo de 8 caracteres')
    .max(15, 'Máximo de 15 caracteres')
    .required('Campo requerido'),
  password: yup.string()
    .min(8, 'Mínimo de 8 caracteres')
    .max(20, 'Máximo de 20 caracteres')
    .required('Campo requerido'),
  rol: yup.string()
    .required('Campo requerido')
})

export default formCreateSchema
