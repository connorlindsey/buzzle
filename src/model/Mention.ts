
export default class Mention {
  alias: string
  userID: string

  constructor(alias: string) {
    this.alias = alias
    this.userID = "0934009as" // TODO: Get the user's ID based on alias
  }
}