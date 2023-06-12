import { Link } from 'react-router-dom'
import ButtonIcon from '../../components/ButtonIcon'

const Page404 = () => {
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center d-flex align-items-center justify-content-center">
              <div className="">
                <div style={{ fontSize: '8em' }}>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </div>
                {/* <img className="img-fluid w-25" src="https://cdn-icons-png.flaticon.com/512/2996/2996824.png" alt="404 not found" /> */}
                <div className="mb-5">
                  <h1>Error 404</h1>
                  <h3>La pagina no existe</h3>
                </div>
                {/* <p className="lead my-4">Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.</p> */}

                {/* <a href="../dashboard/dashboard.html" className="btn btn-gray-800 d-inline-flex align-items-center justify-content-center mb-4">
                  <i className="fa-solid fa-arrow-left"></i>
                  Back to homepage
                </a> */}
                <Link to="/">
                  <ButtonIcon btncolor="btn-primary" btnsize="btn-sm" iconclass="fa-solid fa-arrow-left">
                    Volver al inicio
                  </ButtonIcon>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page404
