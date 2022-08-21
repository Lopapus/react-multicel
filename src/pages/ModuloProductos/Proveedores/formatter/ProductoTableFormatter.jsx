export default (producto) => ({
  id: producto.id,
  codigo_barras: producto.codigo_barras,
  modelo: producto.modelo,
  marca: producto.marca.nombre,
  categoria: producto.categoria.nombre,
  subcategoria: producto.subcategoria.nombre,
  estado: producto.estado,
  stock: producto.stock,
  stock_min: producto.stock_min,
  entrada: 0
})
