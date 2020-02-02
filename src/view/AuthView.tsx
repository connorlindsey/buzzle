import React from 'react';
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import AuthViewModel, { FORMS } from '../viewmodel/AuthViewModel';

const AuthView: React.FC = () => {
  const VM = new AuthViewModel();

  let form;
  if (VM.currentForm === FORMS.SignUp) {
    form = <SignUpForm setCurrentForm={() => VM.setCurrentForm()} />
  } else {
    form = <LoginForm setCurrentForm={() => VM.setCurrentForm()} />
  }
  
  return (
    <div>
      {/* Sign up card */}
      <div>
        {form}
      </div>
    </div> 
  );
}

export default AuthView;