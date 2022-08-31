import React from 'react'

const Donate = ({ value, name, message }) => {
  return (
    <div
      className='font-[Roboto] relative bg-[#75c4d189] block lg:p-5 sm:p-5 pl-9 py-5 border border-gray-100 shadow-xl rounded-xl'
      href=''
    >
      <span className='absolute right-2 top-3 rounded-full px-2 py-1 bg-gray-200 text-green-600 font-medium text-xs'>
        {value} ETH
      </span>

      <div className='text-white sm:pr-8'>
        <h5 className='text-2xl font-bold text-gray-900'>{name}</h5>
        <p className='mt-2 text-lblock'>{message}</p>
      </div>
    </div>
  )
}

export default Donate
