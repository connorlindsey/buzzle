import Mention from "./Mention"
import URL from "./URL"

export default class Status {
  alias: string
  message: string
  mentions: Mention[] = []
  urls: URL[] = []

  constructor(alias: string, message: string) {
    this.alias = alias
    this.message = message
    this.getMentions(message)
    this.getURLs(message)
  }

  private getMentions(message: string): void {

  }

  private getURLs(message: string): void {
    
  }
}