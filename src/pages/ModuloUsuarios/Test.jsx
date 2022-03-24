import { useState } from 'react'

const Test = () => {
  const [data, setData] = useState('')
  const handleSetData = (e) => {
    const { value } = e.target
    const regex = /\D+/g
    const formated = value.replace(regex, '')
    setData(formated)
  }
  return (
    <div>
      <input type="text" value={data} onChange={handleSetData} />
    </div>
  )
}

export default Test
