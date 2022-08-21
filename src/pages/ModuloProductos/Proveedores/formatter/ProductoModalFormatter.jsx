export default (proveedor, producto) => {
  const { id, codigo_barras, subcategoria, marca, modelo, proveedores } = producto
  return {
    id,
    codigo_barras,
    text: (`${subcategoria.nombre} ${marca.nombre} ${modelo}`),
    aggregate: (proveedores.some(({ cuit }) => cuit === proveedor.cuit))
  }
}
