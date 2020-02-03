import React from 'react';
import { useHistory } from "react-router-dom";

interface Props {
  setCurrentForm: any
}


const LoginForm: React.FC<Props> = ({ setCurrentForm }) => {
  const history = useHistory()
  const toggleForm = (): void => {
    setCurrentForm()
  }

  const submitForm = (): void => {
    history.push("/home")
  }

  return (
    <div>
      <form
        style={{ maxWidth: '500px' }}
        className="bg-gray-800 rounded px-8 pt-6 pb-8 mb-4 mx-auto"
      >
        <h2 className="text-2xl font-bold text-white">Welcome back!</h2>
        <div className="mb-4">
          <label className="text-left block text-gray-500 text-sm font-bold mb-2" htmlFor="newEmail">Email</label>
          <input
            className="bg-gray-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newEmail"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="text-left block text-gray-500 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input
            className="bg-gray-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={submitForm}
          >Login</button>
          <span
            onClick={toggleForm}
            className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-400 cursor-pointer"
          >Need an account? Sign up</span>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;