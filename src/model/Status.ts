import Mention from "./Mention"
import URL from "./URL"

export default class Status {
  message: string
  mentions: Mention[]
  urls: URL[]

  constructor(message: string) {
    this.message = message
    this.mentions = [] // TODO: Get mentions from string
    this.urls = [] // TODO: Get urls from string
  }
}