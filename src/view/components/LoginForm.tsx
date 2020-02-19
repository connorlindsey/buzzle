import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { FORMS } from "../AuthView"
import UserService from '../../services/UserService';
import StatusService from '../../services/StatusService';
import FollowerService from '../../services/FollowerService';

interface Props {
  setCurrentForm: any
}

enum STATUS {
  READY,
  LOADING,
  ERROR,
  DONE
}


const LoginForm: React.FC<Props> = ({ setCurrentForm }) => {
  const history = useHistory()
  const [values, setValues] = useState({
    alias: "clindsey",
    password: "test",
  })
  const [status, setStatus] = useState<STATUS>(STATUS.READY)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const submitForm = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setStatus(STATUS.LOADING);
    const result = await UserService.login(values.alias, values.password)
    if (result) {
      setStatus(STATUS.ERROR)
      setErrorMessage(result)
    } else {
      setStatus(STATUS.DONE)

      // TODO: Remove this in production
      // Have people follow logged in user
      await FollowerService.addFollowerManual("matt", values.alias)
      await FollowerService.addFollowerManual("cgood", values.alias)
      await FollowerService.addFollowerManual(values.alias, "cgood")

      // Set up fake data
      await StatusService.createStatus("Wow, welcome to Buzzle 🔥")
      await StatusService.createStatus("Check out this cool thing 🚴‍♂️")
      await StatusService.createStatus("Another tweet 🐦. Hey there @tlane")
    }
    history.push("/home")
  }

  const toggleForm = (): void => {
    setCurrentForm(FORMS.SIGNUP)
  }

  return (
    <div>
      <form
        style={{ maxWidth: '500px' }}
        className="bg-gray-800 rounded px-8 pt-6 pb-8 mb-4 mx-auto"
        onSubmit={submitForm}
      >
        <h2 className="text-2xl font-bold text-white">Welcome back!</h2>
        {errorMessage && <h2 className="text-1xl font-bold text-red-500">{errorMessage}</h2>}
        <div className="mb-4">
          <label className="text-left block text-gray-500 text-sm font-bold mb-2" htmlFor="newEmail">Username</label>
          <input
            className="bg-gray-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="alias"
            name="alias"
            type="text"
            placeholder="Your username"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label className="text-left block text-gray-500 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input
            className="bg-gray-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="********"
            onChange={handleInputChange}

          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >{(status === STATUS.LOADING) ? "Loading..." : "Login"}</button>
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