import React, { useRef } from 'react'
import Input from '../../../components/formComponents/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendResetPasswordOTP } from '../../../features/auth/authSlice';
import { FormPage } from '../../../HOC';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const emailRef = useRef();

  const formHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    dispatch(sendResetPasswordOTP({ email })).unwrap().then(() => {
      navigate(`/forgot-password/${email}/reset`, { replace: true })
    });
  }

  const content = (
    <div className="flex flex-col w-full md:flex-row items-center justify-center my-4">
      <form onSubmit={formHandler} className='relative w-full md:w-[80]md:mx-auto lg:w-[40%] '>
        <Input title='email' type="email" placeholder='type your email' reference={emailRef} />
        <button className="btn btn-primary bg-gray-black text-white w-full capitalize my-2 text-lg hover:bg-gray" disabled={isLoading}>send OTP </button>
        <p className='text-red-600 absolute bottom-[-20px] left-0 '>{error} </p>
      </form>
    </div>
  )
  const pageTitle = "Forgot password Page";
  return (<FormPage children={content} pageTitle={pageTitle} />)
}

export default ForgotPasswordPage
