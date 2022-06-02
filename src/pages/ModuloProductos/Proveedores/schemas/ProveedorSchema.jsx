import * as yup from 'yup'

const proveedorSchema = yup.object().shape({
  nombre: yup.string()
    .min(5, 'Mínimo 5 caracteres')
    .matches(/^[A-z\s]+$/, 'Sólo se permiten letras'),
  cuit: yup.string()
    .length(11, 'Debe contener 11 caracteres')
    .matches(/^(?:[0-9])*$/gm, 'Sólo se permiten números')
})

export default proveedorSchema
