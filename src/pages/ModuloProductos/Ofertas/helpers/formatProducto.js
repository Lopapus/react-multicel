import makeRandomString from '../../../../helpers/MakeRandomString'

export default (producto, position) => {
  return {
    position,
    uid: makeRandomString(4),
    label: `${producto.modelo} ${producto.marca.nombre} - ${producto.categoria.nombre}`,
    descuento: 0,
    precio_real: producto.precio,
    precio: producto.precio,
    checked: false
  }
}
