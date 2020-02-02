export enum FORMS {
  SignUp,
  Login
}

export default class AuthViewModel {
  email: string = "";
  password: string = "";
  currentForm: FORMS = FORMS.SignUp;

  setCurrentForm() {
    console.log("Setting form in VM");
    if (this.currentForm === FORMS.SignUp) {
      console.log("Switching to login")
      this.currentForm = FORMS.Login;
    } else if (this.currentForm === FORMS.Login) {
      console.log("Switching to signup")
      this.currentForm = FORMS.SignUp;
    }
  }
}