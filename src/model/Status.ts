// Status represents a message sent by a user, which includes their alias
export default class Status {
  authorAlias: string
  status: string

  constructor(alias: string, message: string) {
    this.authorAlias = alias
    this.status = message
  }

}