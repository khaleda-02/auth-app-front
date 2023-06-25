import { useDispatch, useSelector } from 'react-redux'
import { sendVerifyUserOTP } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  //! you don't need to check of the user , cuz this component is protected . 
  //! that's means the component will not render if there is no user .


  const verifyUser = () => {
    dispatch(sendVerifyUserOTP()).unwrap().then(() => {
      navigate('/verify', { replace: true })
    });
  }

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

          {!user.verified && <button onClick={verifyUser} className='bg-black text-white rounded-md px-3 py-2'>verify your email</button>}

        </div>
        :
        ""
      }

    </div >
  )
}

export default ProfilePage
