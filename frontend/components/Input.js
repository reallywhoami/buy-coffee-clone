const Input = ({ placeholder, onc, validate }) => {
  return (
    <div className='relative'>
      <label className='block text-m font-medium text-gray-200'>
        {placeholder}
      </label>

      <input
        className='w-full p-3 mt-1 text-sm border-2 border-gray-200 rounded'
        onChange={onc}
        type={validate ? 'number' : ''}
      />
    </div>
  )
}

export default Input
