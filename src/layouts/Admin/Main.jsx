import Navbar from './Navbar'
const Main = ({ content }) => {
  return (
    <>
      <main className="content vh-100">
        <Navbar />
        <div className='pt-3'>
          {content}
        </div>
      </main>
    </>
  )
}

export default Main
