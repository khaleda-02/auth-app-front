import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/formComponents/Input';
import { resetPassword } from '../../../features/auth/authSlice';
import { FormPage } from '../../../HOC';


const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
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
  }

  const content = (
    <div className="flex flex-col w-full md:flex-row items-center justify-center my-4">
      <form onSubmit={formHandler} className='relative w-full md:w-[80]md:mx-auto lg:w-[40%] '>
        <Input title='the code' type="text" placeholder='type the code ' reference={otpRef} />
        <Input title='new password' type="text" placeholder='' reference={newPasswordRef} />
        <Input title='comfirm password ' type="text" placeholder='' reference={comfirmPasswordRef} />
        <button className="btn btn-primary bg-gray-black text-white w-full capitalize my-2 text-lg hover:bg-gray" >reset your password </button>
        <p className='text-red-600 absolute bottom-[-20px] left-0 '>{error} </p>
      </form>
    </div>
  )
  const pageTitle = "Reset password";
  const pageInfo = "please check you eamil .";
  return (<FormPage children={content} pageInfo={pageInfo} pageTitle={pageTitle} />)
}
export default ResetPasswordPage;
