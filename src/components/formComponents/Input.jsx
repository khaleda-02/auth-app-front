import React from 'react'

const Input = ({ title, placeholder, type , reference }) => {
  return (
    <div className="form-control w-full py-0 my-2">
      <label className="label py-0 mt-4">
        {title &&
          <span className="label-text capitalize text-xl text-gray-black">{title}</span>
        }
      </label>
      <input type={type} placeholder={placeholder} ref={reference} className='block px-2 py-3  bg-transparent border-gray-200 border-solid border-2 rounded-md w-full  placeholder:text-[15px] placeholder:text-gray placeholder:capitalize' />
    </div>
  )
}

export default Input
