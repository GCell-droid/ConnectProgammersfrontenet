import React from 'react'
import { Link } from 'react-router'

const Error = ({message}) => {
  return (
    <div>
       <div className="mt-20 flex items-center justify-center ">
      <div className="text-center p-8  rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-5xl font-extrabold text-red-500">Oops!</h1>
        <p className="text-xl text-gray-700 dark:text-gray-400 mt-4">{message}</p>
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          If you think this is an error, please contact support or try again later.
        </p>
        <Link
          to="/"
          className="btn btn-accent mt-2"
        >
          Go to Home
        </Link>
      </div>
    </div>
    </div>
  )
}

export default Error
