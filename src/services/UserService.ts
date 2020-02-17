import ServerFacade from "../network/ServerFacade"
import User from "../model/User"

export default class UserService {
  static checkIsFollowing = (userID: string, alias: string): boolean => {
    let user = ServerFacade.getUserByID(userID)
    if (user && user.following.includes(alias)) {
      return true;
    }
    return false;
  }

  static signup = (name: string, alias: string, password: string): string => {
    try {
      var user = ServerFacade.signup(name, alias, password)
      localStorage.setItem("USER_ID", user.ID)
    } catch (e) {
      if (e instanceof Error) {
        return e.message
      }
    }
    return ""
  }

  static login = (alias: string, password: string): string => {
    try {
      var user = ServerFacade.login(alias, password)
      localStorage.setItem("USER_ID", user.ID)
    } catch (e) {
      if (e instanceof Error) {
        return e.message
      }
    }
    return ""
  }

  static logout = (): boolean => {
    localStorage.removeItem("USER_ID")
    return true
  }

  static updatePicture = (file: File): string => {
    let user = UserService.getCurrentUser();
    if (!user) {
      return "You must be logged in to complete this operation"
    }
    try {
      ServerFacade.updatePicture(user.ID, file)
    } catch (e) {
      if (e instanceof Error) {
        return e.message
      }
    }
    return ""
  }
  static getCurrentUser = (): User | null => {
    let id = localStorage.getItem("USER_ID") || ""
    let user = ServerFacade.getUserByID(id)
    return user
  }

  static getUserByID = (id: string): User | null => {
    let user = ServerFacade.getUserByID(id)
    return user;
  }
  static getUserByAlias = (alias: string): User | null => {
    let user = ServerFacade.getUserByAlias(alias)
    return user;
  }
}
