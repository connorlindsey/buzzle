// Status represents a message sent by a user, which includes their alias
export default class Status {
  alias: string
  message: string

  constructor(alias: string, message: string) {
    this.alias = alias
    this.message = message
  }

}