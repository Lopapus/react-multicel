import React from 'react'

const InputRegex = ({ onChange, regex, ...rest }) => {
  const onChangeRegex = (e) => {
    const { value } = e.target
    if (regex.test(value)) {
      onChange(e)
    }
  }

  return (
    <input onChange={onChangeRegex} {...rest} />
  )
}

export default InputRegex
