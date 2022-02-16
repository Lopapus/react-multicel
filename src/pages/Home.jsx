import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Home = () => {
  const params = useParams()
  useEffect(
    async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const json = await response.json()
      console.log(json)
    }
    , [])
  return (
    <div className="card border-0 shadow h-100">
      <div className="card-body">
        {params.page}
      </div>
    </div>
  )
}

export default Home
