const CardComponent = ({ title, children }) => {
  return (
    <div className="card border-0 shadow my-3">
      {
        title &&
        <div className="card-header border-bottom d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bold mb-0">{title}</h2>
        </div>
      }
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

export default CardComponent
