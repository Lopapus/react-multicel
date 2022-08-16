import * as yup from 'yup'

const ProductoSchema = yup.object().shape({
  modelo: yup.string()
    .trim('No debe contener espacios innecesarios')
    .min(2, 'Debe ingresar al menos 2 caracteres')
    .max(35, 'Excedió el máximo de 35 caracteres'),
  precio: yup.number()
    .positive('Solo se permiten valores positivos o neutro'),
  stock: yup.number()
    .positive('Solo se permiten valores positivos o neutro'),
  stock_min: yup.number()
    .positive('Solo se permiten valores positivos o neutro'),
  id_categoria: yup.number()
    .required('Seleccione una categoría'),
  id_subcategoria: yup.number()
    .required('Seleccione una subcategoría'),
  id_marca: yup.number()
    .required('Seleccione la marca del producto')
})

export default ProductoSchema
