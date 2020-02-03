import React, { useState, useEffect } from 'react';
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import AuthViewModel, { FORMS, AuthObserver } from '../viewmodel/AuthViewModel';
import styled from 'styled-components'

const Container = styled.div`
  max-width: 600px;
  margin: 1rem auto;
`

const AuthView: React.FC = () => {
  const [VM] = useState(new AuthViewModel())
  const [currentForm, setCurrentForm] = useState(VM.currentForm)

  const onUpdate: AuthObserver = () => {
    setCurrentForm(VM.currentForm)
  }

  useEffect(() => {
    VM.attach(onUpdate)
    return () => VM.detach(onUpdate)
  })

  let form;
  if (currentForm === FORMS.SignUp) {
    form = <SignUpForm setCurrentForm={() => VM.setCurrentForm()} />
  } else {
    form = <LoginForm setCurrentForm={() => VM.setCurrentForm()} />
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