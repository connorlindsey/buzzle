import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import UserService from '../../services/UserService';
import User from "../../model/User"

interface ComponentProps {
  children: any
}

// Redirects users if they are not signed in when necessary
const PleaseSignIn: React.FC<ComponentProps> = props => {
  const [user, setUser] = useState<User | null>();
  const updateUser = useCallback(
    async () => {
      try {
        const res = await UserService.getCurrentUser()
        setUser(res)
      } catch (e) {
        setUser(null);
      }
    },
    [],
  )

  // Calculate the following relationship
  useEffect(() => {
    updateUser()
  }, [updateUser])

  if (user === null) {
    return (
      <Redirect to="/" />
    )
  } else {
    return props.children
  }
};
export default PleaseSignIn;
