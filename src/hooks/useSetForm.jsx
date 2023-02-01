import { useState } from 'react'

const useSetForm = (object = {}) => {
  const [form, setForm] = useState(object)

  const handleSetForm = (e) => {
    const { name, value } = e.target
    // validación de campo
    if ((typeof value === 'string' && value.trim() !== '') || (typeof value === 'object')) {
      setForm({ ...form, [name]: value })
    } else {
      if (form[name]) {
        const new_form = { ...form }
        delete new_form[name]
        setForm({ ...new_form })
      }
    }
  }

  return [form, handleSetForm, setForm]
}

export default useSetForm
