import { useState, useEffect } from 'react'

const ModalUser = (id) => {
  const [datosUser, setDatosUser] = useState()

  const handleFetch = async () => {
    try {
      const peticion = await fetch(`http://localhost:4000/usuarios/${id}`)
      const res = await peticion.json()
      // console.log(res)
      setDatosUser(res)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(datosUser)

  useEffect(() => {
    handleFetch()
  }, [])
  return (
    <>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#modalUser${id}`}>
        Launch demo modal
      </button>

      <div className="modal fade" id={`modalUser${id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalUser
