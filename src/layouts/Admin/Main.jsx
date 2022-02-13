import Navbar from './Navbar'
import Breadcrumb from './Breadcrumb'
const Main = ({ content }) => {
  return (
    <>
      <main className="content vh-100">
        <Navbar />
        <Breadcrumb />
        <div className='pt-3'>
          {content}
        </div>
      </main>
    </>
  )
}

export default Main
