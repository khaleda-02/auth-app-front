import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register, registerWithGoogle } from '../../features/auth/authSlice'
import Input from '../../components/formComponents/Input'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import { FormPage } from '../../HOC'



const RegisterPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  const formHandler = (e) => {
    e.preventDefault()
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;

    dispatch(register({ username, email, password })).unwrap().then(() => { navigate('/', { replace: true }) });

    usernameRef.current.value = null;
    passwordRef.current.value = null;
    emailRef.current.value = null;
  }

  const registerWithGoogleHandler = (e) => {
    e.preventDefault();
    dispatch(registerWithGoogle())
      .unwrap().then(() => navigate('/', { replace: true }));
  };


  const content = (
    <div className="flex flex-col w-full md:flex-row items-center justify-center my-4">
      <form onSubmit={formHandler} className='relative w-full md:w-[80]md:mx-auto lg:w-[40%] '>
        <Input title='email' type="email" placeholder='type your email' reference={emailRef} />
        <Input title='user name' type="text" placeholder='type your user name ' reference={usernameRef} />
        <Input title='password' type='password' placeholder='type your password' reference={passwordRef} />
        <button className="btn btn-primary bg-gray-black text-white w-full capitalize my-2 text-lg hover:bg-gray" disabled={isLoading}>sign up</button>
        <div className='w-full flex justify-between items-center '>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text capitalize ">Remember me</span>
              <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(pre => !pre)} className="checkbox border-black w-[16px] h-[16px] mx-1 rounded-md" />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text capitalize  ">
                <Link to='/' className='hover:pb-[1px] border-b-2 border-solid border-gray-200'>
                  forgot password
                </Link>
              </span>
            </label>
          </div>
        </div>
        <p className='text-red-600 absolute bottom-[-20px] left-0 '>{error} </p>
      </form>
      <div className="divider lg:divider-horizontal text-black after:bg-gray-white before:bg-gray-white">OR</div>
      <div className='w-full md:w-[80]md:mx-auto lg:w-[40%] '>
        <button onClick={registerWithGoogleHandler} className="btn btn-outline w-full capitalize mx-2 my-4 flex items-center justify-center gap-2"><FcGoogle size={23} /> register with goooogle </button>
        <Link to="/login" className="btn btn-outline w-full capitalize mx-2 my-4 flex items-center justify-center gap-2">if you are a user , login!</Link>
      </div>
    </div>
  )
  const pageTitle = "Register Page";
  const pageInfo = "hey , Welcome to our Auth application .";
  return (<FormPage children={content} pageInfo={pageInfo} pageTitle={pageTitle} />)
}

export default RegisterPage
