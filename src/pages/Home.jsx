import { useParams } from 'react-router-dom'

const Home = () => {
  const params = useParams()
  return (
    <div className="card border-0 shadow h-100">
      <div className="card-body">
        {params.page}
      </div>
    </div>
  )
}

export default Home
