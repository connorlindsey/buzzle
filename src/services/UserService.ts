import ServerFacade from "../network/ServerFacade"
import User from "../model/User"

// Handle common tasks related to users by communicating between
// the View and Server
export default class UserService {
  // Returns a boolean indicating whether the current user is following the user with the given alias
  static checkIsFollowing = async (userID: string, alias: string): Promise<boolean> => {
    try {
      let user = await ServerFacade.getUserByAlias(userID)
      if (user.following.includes(alias)) {
        return true;
      }
      return false;
    } catch (e) {
      return false
    }
  }

  static signup = async (name: string, alias: string, password: string): Promise<string> => {
    try {
      var user = await ServerFacade.signup(name, alias, password)
      localStorage.setItem("USER_ALIAS", user.alias)
    } catch (e) {
      if (e instanceof Error) {
        return e.message
      }
    }
    return ""
  }

  static login = async (alias: string, password: string): Promise<string> => {
    try {
      var user = await ServerFacade.login(alias, password)
      localStorage.setItem("USER_ALIAS", user.alias)
    } catch (e) {
      console.error(e)
      if (e instanceof Error) {
        return e.message
      }
    }
    return ""
  }

  static logout = (): boolean => {
    localStorage.removeItem("USER_ALIAS")
    localStorage.removeItem("TOKEN")
    return true
  }

  static updatePicture = async (file: File): Promise<string> => {
    try {
      await ServerFacade.updatePicture(file)
    } catch (e) {
      if (e instanceof Error) {
        return e.message
      }
    }
    return ""
  }

  static getCurrentUser = async (): Promise<User> => {
    let alias = localStorage.getItem("USER_ALIAS") || ""
    let user = await ServerFacade.getUserByAlias(alias)
    return user
  }

  static getUserByAlias = async (alias: string): Promise<User> => {
    let user = await ServerFacade.getUserByAlias(alias)
    return user
  }
}
