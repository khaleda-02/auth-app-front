import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/formComponents/Input';
import { resetPassword } from '../../../features/auth/authSlice';


const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const { email } = useParams();

  const otpRef = useRef();
  const newPasswordRef = useRef();
  const comfirmPasswordRef = useRef();

  const formHandler = (e) => {
    e.preventDefault()
    const OTP = otpRef.current.value.trim();
    const newPassword = newPasswordRef.current.value;
    const comfirmPassword = comfirmPasswordRef.current.value;
    if (newPassword == comfirmPassword)
      dispatch(resetPassword({ email, OTP, newPassword })).unwrap().then(() => navigate('/login', { replace: true }))

    //TODO validation for not equaled passwords 
  }


  return (
    <div className='w-full h-[100vh]'>
      {/* form container */}
      <div className='w-full min-h-[92vh] bg-black flex items-center justify-center '>
        {/*form div */}
        <div className='w-full md:w-[80%] lg:w-[40%] mx-auto bg-white h-full md:h-fit overflow-scroll md:rounded-3xl py-9 px-9'>
          {/* heading */}
          <h2 className='text-center capitalize font-extrabold text-6xl my-4 text-black'>please check you eamil .</h2>

          {/* from */}
          <div className="flex flex-col w-full md:flex-row items-center justify-center my-4">
            <form onSubmit={formHandler} className='relative w-full md:w-[80]md:mx-auto lg:w-[40%] '>
              <Input title='the code' type="text" placeholder='type the code ' reference={otpRef} />
              <Input title='new password' type="text" placeholder='' reference={newPasswordRef} />
              <Input title='comfirm password ' type="text" placeholder='' reference={comfirmPasswordRef} />
              <button className="btn btn-primary bg-gray-black text-white w-full capitalize my-2 text-lg hover:bg-gray" >reset your password </button>
              <p className='text-red-600 absolute bottom-[-20px] left-0 '>{error} </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ResetPasswordPage;