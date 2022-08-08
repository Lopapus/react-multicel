import * as yup from 'yup'

const ProductoSchema = yup.object().shape({
  precio: yup.number()
    .required('Debe ingresar un precio'),
  stock: yup.number()
    .required('Debe ingresar el stock'),
  stock_min: yup.number
    .required('Debe ingresar un stock mínimo'),
  fecha_ingreso: yup.date()
    .required('Debe ingresar la fecha de ingreso'),
  id_categoria: yup.number()
    .required('Seleccione una categoría'),
  id_subcategoria: yup.number()
    .required('Seleccione una subcategoría'),
  id_marca: yup.number()
    .required('Seleccione la marca del producto')
})

export default ProductoSchema
