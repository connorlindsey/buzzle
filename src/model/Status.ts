import Mention from "./Mention"
import URL from "./URL"

export default class Status {
  userId: string
  message: string
  mentions: Mention[] = []
  urls: URL[] = []

  constructor(userId: string, message: string) {
    this.userId = userId
    this.message = message
    this.getMentions(message)
    this.getURLs(message)
  }

  private getMentions(message: string): void {

  }

  private getURLs(message: string): void {
    
  }
}