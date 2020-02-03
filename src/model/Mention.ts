import Alias from "./Alias";
import ID from "./ID";

export default class Mention {
  alias: Alias
  userID: ID

  constructor(alias: string) {
    this.alias = new Alias(alias)
    this.userID = new ID() // TODO: Get the user's ID based on alias
  }
}