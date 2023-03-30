export default (producto) => {
  return {
    label: `${producto.modelo} ${producto.marca.nombre} - ${producto.categoria.nombre}`,
    precio_real: producto.precio,
    precio: producto.precio,
    agregado: false
  }
}
