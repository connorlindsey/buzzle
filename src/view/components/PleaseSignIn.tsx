import React from 'react';
import { Redirect } from 'react-router-dom';

interface ComponentProps {
  children: any
}

const PleaseSignIn: React.FC<ComponentProps> = props => {
  const USER_ID = localStorage.getItem("USER_ID");

  if (USER_ID === null) {
    return (
      <Redirect to="/" />
    )
  } else {
    return props.children
  }
};
export default PleaseSignIn;
