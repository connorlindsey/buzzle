import ServerFacade from "../network/ServerFacade";

export default class FollowerService {

  public static addFollower(alias: string): void {
    let ID = localStorage.getItem("USER_ID") || "";
    let currentAlias = ServerFacade.getUserByID(ID)?.alias || "";
    ServerFacade.addFollower(currentAlias, alias);
  }

  public static removeFollower(alias: string): void {
    let ID = localStorage.getItem("USER_ID") || "";
    let currentAlias = ServerFacade.getUserByID(ID)?.alias || "";
    ServerFacade.removeFollower(currentAlias, alias);
  }

  public static addFollowerManual(follower: string, followee: string): void {
    ServerFacade.addFollower(follower, followee)
  }
}