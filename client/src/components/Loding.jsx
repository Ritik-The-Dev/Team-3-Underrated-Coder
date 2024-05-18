import React from 'react'
import { Audio } from 'react-loader-spinner'

const Loding = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-transparent flex items-center justify-center rounded shadow-md w-full max-w-md">
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        </div>
  )
}

export default Loding
