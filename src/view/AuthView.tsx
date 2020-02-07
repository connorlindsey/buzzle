import React, { useState } from 'react';
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import styled from 'styled-components'

const Container = styled.div`
  max-width: 600px;
  margin: 1rem auto;
`

export enum FORMS {
  LOGIN,
  SIGNUP
}

const AuthView: React.FC = () => {
  const [currentForm, setCurrentForm] = useState(FORMS.LOGIN)

  let form;
  if (currentForm === FORMS.SIGNUP) {
    form = <SignUpForm setCurrentForm={setCurrentForm} />
  } else {
    form = <LoginForm setCurrentForm={setCurrentForm} />
  }
  
  return (
    <Container>
      {/* Sign up card */}
      <div className="mt-12">
        {form}
      </div>
    </Container> 
  );
}

export default AuthView;