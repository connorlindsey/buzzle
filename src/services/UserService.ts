import ServerFacade from "../network/ServerFacade"
import User from "../model/User"

// Handle common tasks related to users by communicating between
// the View and Server
export default class UserService {
  // Returns a boolean indicating whether the current user is following the user with the given alias
  static checkIsFollowing = async (userA: string, userB: string): Promise<boolean> => {
    return ServerFacade.isFollowing(userA, userB)
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
      if (e instanceof Error) {
        return e.message
      }
    }
    return ""
  }

  static logout = async (): Promise<string> => {
    try {
      let res: string = await ServerFacade.logout()
      localStorage.removeItem("USER_ALIAS")
      localStorage.removeItem("TOKEN")
      return res
    } catch (e) {
      if (e instanceof Error) {
        return e.message
      }
    }
    return ""
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
    try {
      let user = await ServerFacade.getUserByAlias(alias)
      return user
    } catch (e) {
      return new User("", "", "", "")
    }
  }

  static getUserByAlias = async (alias: string): Promise<User> => {
    try {
      let user = await ServerFacade.getUserByAlias(alias)
      return user
    } catch (e) {
      return new User("", "", "", "")
    }
  }
}
