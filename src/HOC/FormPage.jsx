import React from 'react'
import { useSelector } from 'react-redux'

const FormPage = ({ children, pageTitle, pageInfo }) => {
  const { isLoading } = useSelector(state => state.auth)

  return (
    <div className='w-full h-[100vh]'>
      {
        isLoading
        && <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
          <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
        </div>
      }
      {/* form container */}
      <div className='w-full min-h-[92vh] bg-black flex items-center justify-center '>
        {/*form div */}
        <div className='w-full md:w-[80%] lg:w-[60%] mx-auto bg-white h-full md:h-fit overflow-scroll md:rounded-3xl py-9 px-9'>
          {/* heading */}
          <h2 className='text-center capitalize font-extrabold text-6xl my-4 text-black'>{pageTitle}</h2>
          {pageInfo &&
            <p className='text-center capitalize my-4 text-2xl text-gray-black'>{pageInfo}</p>
          }

          {/* from */}
          {children}
          {/* pearent div styling :  className="flex flex-col w-full md:flex-row items-center justify-center my-4" */}
        </div>
      </div>
    </div>
  )
}

export default FormPage
