import { useSelector } from 'react-redux'
const ProfilePage = () => {
  const { user } = useSelector(state => state.auth);

  //! you don't need to check of the user , cuz this component is protected . 
  //! that's means the component will not render if there is no user .

  return (
    <div className='min-h-[90vh] flex flex-col items-center  justify-center'>
      {user ?
        <div>
          <h1>
            {user.username}
          </h1>
          <h1>
            {user.email}
          </h1>

        </div>
        :
        ""
      }

    </div >
  )
}

export default ProfilePage
