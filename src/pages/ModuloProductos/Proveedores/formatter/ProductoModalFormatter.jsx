export default (proveedor, producto) => {
  const { id, codigo_barras, subcategoria, marca, modelo, proveedores } = producto
  const aggregate = proveedores.some(({ cuit }) => cuit === proveedor.cuit)

  return {
    id,
    proveedor: proveedor.id,
    codigo_barras,
    text: (`${subcategoria.nombre} ${marca.nombre} ${modelo}`),
    aggregate,
    update: false,
    prev_aggregate: aggregate
  }
}
