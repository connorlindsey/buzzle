import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import UserService from '../services/UserService';

enum STATUS {
  READY,
  LOADING,
  ERROR,
  DONE
}

const UploadImage: React.FC = () => {
  const history = useHistory()
  const [file, setFile] = useState<File>()
  const [status, setStatus] = useState<STATUS>(STATUS.READY)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleUpload = (event: React.MouseEvent): void => {
    event.preventDefault();
    setStatus(STATUS.LOADING);
    if (!file) {
      setStatus(STATUS.ERROR)
      setErrorMessage("Please upload an image")
      return;
    }
    const result = UserService.updatePicture(file)
    if (result) {
      setStatus(STATUS.ERROR)
      setErrorMessage(result)
    } else {
      setStatus(STATUS.DONE)
      history.push("/home")
    }
  }

  const onChange = (files: FileList | null): void => {
    if (files === null) {
      return;
    }
    const file = files[0]
    if (file) {
      setFile(file)
    }
  }

  return (
    <div>
      <form
        style={{ maxWidth: '500px' }}
        className="bg-gray-800 rounded px-8 pt-6 pb-8 mb-4 mx-auto"
      >
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white">Welcome to Buzzle</h2>
          <h3 className="text-2xl text-white">Please upload a profile picture</h3>
          {errorMessage && <h2 className="text-1xl text-center font-bold text-red-500">{errorMessage}</h2>}
          <div className="flex items-center justify-between">
            <input type="file" onChange={(e) => onChange(e.target.files)} />
            <button
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleUpload}
            >{(status === STATUS.LOADING) ? "Loading..." : "Upload"}</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadImage;