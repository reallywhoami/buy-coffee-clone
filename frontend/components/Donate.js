import React from 'react'

const Donate = ({ tipper, value, name, message }) => {
  return (
    <div
      className='font-[Roboto] relative bg-[#75c4d189] block p-5 pb-2 px-9 py-5 border border-gray-100 shadow-xl rounded-xl'
      href=''
    >
      <span className='absolute right-2 top-3 rounded-full px-2 py-1 bg-gray-200 text-green-600 font-medium text-xs'>
        {value.length > 7 ? `${value.slice(0, 7)}...` : value} ETH
      </span>

      <div className='text-white pr-17'>
        <h5 className='text-2xl font-bold text-gray-900'>
          {name.length > 20 ? `${name.slice(0, 20)}...` : name}
        </h5>
        <p className='mt-2'>
          {message.length > 150 ? `${message.slice(0, 150)}...` : message}
        </p>
        <p className='text-slate-300 drop-shadow-2xl text-sm text-right sm:pt-3 lg:pt-3'>
          {tipper.slice(0, 5)}...
          {tipper.slice(tipper.length - 4, tipper.length + 1)}
        </p>
      </div>
    </div>
  )
}

export default Donate
