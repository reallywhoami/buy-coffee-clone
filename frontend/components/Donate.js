import React from 'react'

const Donate = ({ value, name, message }) => {
  return (
    <div
      className='font-[Roboto] relative bg-[#75c4d189] block lg:p-5 sm:p-5 px-9 py-5 border border-gray-100 shadow-xl rounded-xl'
      href=''
    >
      <span className='absolute right-2 top-3 rounded-full px-2 py-1 bg-gray-200 text-green-600 font-medium text-xs'>
        {value.length > 7 ? `${value.slice(0, 7)}...` : value} ETH
      </span>

      <div className='text-white pr-17'>
        <h5 className='text-2xl font-bold text-gray-900'>
          {name.length > 20 ? `${name.slice(0, 20)}...` : name}
        </h5>
        <p className='mt-2 text-lblock'>
          {message.length > 150 ? `${message.slice(0, 150)}...` : message}
        </p>
      </div>
    </div>
  )
}

export default Donate
