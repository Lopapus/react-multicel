import * as yup from 'yup'

const formEditPasswordSchema = yup.object().shape({
  password: yup.string()
    .min(8, 'Mínimo de 8 caracteres')
    .max(20, 'Máximo de 20 caracteres')
    .required('Campo requerido')
})

export default formEditPasswordSchema
