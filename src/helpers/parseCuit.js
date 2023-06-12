export default (cuit = '') => {
  if (cuit.length >= 11) {
    const first_digit = cuit.slice(0, 2)
    const dni = cuit.slice(2, 10)
    const last_digit = cuit.slice(10, 11)
    return (first_digit + '-' + dni + '-' + last_digit)
  } else {
    return cuit
  }
}
