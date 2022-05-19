const format = (data) => {
  const { nombre, ...rest } = data
  return {
    name: nombre,
    ...rest
  }
}

export default (json) => {
  if (typeof json === 'object') {
    // devuelve una lista con un solo elemento formateado
    return [format(json)]
  } else {
    // devuelve una lista de elementos formateados
    return json.map(element => format(element))
  }
}
