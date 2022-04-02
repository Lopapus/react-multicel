import * as yup from 'yup'

const formEditUserSchema = yup.object().shape({
  nombre: yup.string()
    .min(6, 'Mínimo 4 caracteres')
    .matches(/^[aA-zZ\s]+$/, 'Sólo se permiten letras')
    .required('Campo requerido'),
  usuario: yup.string()
    .min(8, 'Mínimo de 8 caracteres')
    .max(20, 'Máximo de 15 caracteres')
    .required('Campo requerido')
})

export default formEditUserSchema
