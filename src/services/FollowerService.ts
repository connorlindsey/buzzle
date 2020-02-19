import ServerFacade from "../network/ServerFacade"
import User from "../model/User"

// Handle common tasks related to following by communicating between
// the View and Server
export default class FollowerService {
  public static async addFollower(alias: string): Promise<void> {
    let ID = localStorage.getItem("USER_ID") || ""
    let user = await ServerFacade.getUserByID(ID)
    let currentAlias = user.alias
    await ServerFacade.addFollower(currentAlias, alias)
  }

  public static async removeFollower(alias: string): Promise<void> {
    let ID = localStorage.getItem("USER_ID") || ""
    let user = await ServerFacade.getUserByID(ID)
    let currentAlias = user.alias
    await ServerFacade.removeFollower(currentAlias, alias)
  }

  public static async addFollowerManual(follower: string, followee: string): Promise<void> {
    await ServerFacade.addFollower(follower, followee)
  }

  static loadMoreFollowers = async (pag: number, ID: string): Promise<User[]> => {
    try {
      return await ServerFacade.loadMoreFollowers(pag, ID)
    } catch (e) {
      throw e;
    }
  }

  static loadMoreFollowing = async (pag: number, ID: string): Promise<User[]> => {
    try {
      return await ServerFacade.loadMoreFollowing(pag, ID)
    } catch (e) {
      throw e;
    }
  }
}
