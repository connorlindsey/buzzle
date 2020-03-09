import ServerFacade from "../network/ServerFacade"
import Status from "../model/Status"

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

  static loadMoreStory = async (pag: number, alias: string): Promise<Status[]> => {
    try {
      return await ServerFacade.loadMoreStory(pag, alias)
    } catch (e) {
      throw e;
    }
  }

  static loadMoreFeed = async (pag: number, alias: string): Promise<Status[]> => {
    try {
      return await ServerFacade.loadMoreFeed(pag, alias)
    } catch (e) {
      throw e;
    }
  }
}
