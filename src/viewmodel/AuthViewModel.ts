export enum FORMS {
  SignUp,
  Login
}

export type AuthObserver = () => void;

export default class AuthViewModel {
  private email: string = "";
  private password: string = "";
  public currentForm: FORMS = FORMS.SignUp;
  private observers: AuthObserver[] = [];

  public attach(observer: AuthObserver) {
    this.observers.push(observer)
  }

  public detach(observer: AuthObserver) {
    this.observers = this.observers.filter(obs => obs !== observer)
  }

  private notify() {
    this.observers.forEach(obs => obs())
  }

  public setCurrentForm() {
    if (this.currentForm === FORMS.SignUp) {
      this.currentForm = FORMS.Login;
    } else if (this.currentForm === FORMS.Login) {
      this.currentForm = FORMS.SignUp;
    }
    this.notify();
  }
}