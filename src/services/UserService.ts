import ServerFacade from "../network/ServerFacade"
import User from "../model/User"

// Handle common tasks related to users by communicating between
// the View and Server
export default class UserService {
  // Returns a boolean indicating whether the current user is following the user with the given alias
  static checkIsFollowing = async (userID: string, alias: string): Promise<boolean> => {
    try {
      let user = await ServerFacade.getUserByID(userID)
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
      localStorage.setItem("USER_ID", user.ID)
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

  static updatePicture = async (file: File): Promise<string> => {
    let user = await UserService.getCurrentUser()
    if (!user) {
      return "You must be logged in to complete this operation"
    }
    try {
      await ServerFacade.updatePicture(user.ID, file)
    } catch (e) {
      if (e instanceof Error) {
        return e.message
      }
    }
    return ""
  }

  static getCurrentUser = async (): Promise<User> => {
    let id = localStorage.getItem("USER_ID") || ""
    let user = await ServerFacade.getUserByID(id)
    return user
  }

  static getUserByID = async (id: string): Promise<User> => {
    let user = await ServerFacade.getUserByID(id)
    return user
  }
  static getUserByAlias = async (alias: string): Promise<User> => {
    let user = await ServerFacade.getUserByAlias(alias)
    return user
  }
}
