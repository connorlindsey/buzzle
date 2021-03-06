import ServerFacade from "../network/ServerFacade"

// Handle common tasks related to following by communicating between
// the View and Server
export default class FollowerService {
  public static async addFollower(alias: string): Promise<void> {
    let userAlias = localStorage.getItem("USER_ALIAS") || ""
    await ServerFacade.addFollower(userAlias, alias)
  }

  public static async removeFollower(alias: string): Promise<void> {
    let userAlias = localStorage.getItem("USER_ALIAS") || ""
    await ServerFacade.removeFollower(userAlias, alias)
  }

  public static async addFollowerManual(follower: string, followee: string): Promise<void> {
    await ServerFacade.addFollower(follower, followee)
  }

  static loadMoreFollowers = async (key: string, alias: string): Promise<any> => {
    try {
      return await ServerFacade.loadMoreFollowers(key, alias)
    } catch (e) {
      throw e
    }
  }

  static loadMoreFollowing = async (key: string, alias: string): Promise<any> => {
    try {
      return await ServerFacade.loadMoreFollowing(key, alias)
    } catch (e) {
      throw e
    }
  }
}
