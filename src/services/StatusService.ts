import ServerFacade from "../network/ServerFacade"

// Handle common tasks related to statuses by communicating between
// the View and Server
export default class StatusService {
  static createStatus = (message: string): string => {
    try {
      if (message.length > 120) {
        return "Status is too long"
      }
      ServerFacade.createStatus(message)
    } catch (e) {
      if (e instanceof Error) {
        return e.message
      }
    }
    return ""
  }

  static loadMoreStory = (): string => {
    try {
      ServerFacade.loadMoreStory()
    } catch (e) {
      if (e instanceof Error) {
        return e.message
      }
    }
    return ""
  }
}
