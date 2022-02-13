import ButtonIcon from './ButtonIcon'

const UserItem = ({ name, rol }) => {
  return (
    <li className="list-group-item px-0 border-bottom">
      <div className="row align-items-center">
        <div className="col-auto">
          {/* <!-- Avatar --> */}
          <span className="avatar">
            <img className="rounded" alt="Image placeholder" src="https://cambodiaict.net/wp-content/uploads/2019/12/computer-icons-user-profile-google-account-photos-icon-account.jpg" />
          </span>
        </div>
        <div className="col-auto ms--2">
          <h4 className="h6 mb-0">
            {name}
          </h4>
          <div className="d-flex align-items-center text-info">
            <small>{rol}</small>
          </div>
        </div>
        <div className="col text-end">
          <ButtonIcon btncolor={'btn-primary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-pencil'} />
        </div>
      </div>
    </li>
  )
}

export default UserItem
