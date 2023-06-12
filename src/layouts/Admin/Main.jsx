import Navbar from './Navbar'
import Breadcrumb from './Breadcrumb'
const Main = ({ content }) => {
  return (
    <>
      <main className="content">
        <Navbar />
        <Breadcrumb />
        {content}
      </main>
    </>
  )
}

export default Main
