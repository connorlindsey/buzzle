import ServerFacade from "../network/ServerFacade"

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

  static loadStatuses = (): string => {
    try {
      // ServerFacade.loadStatuses()
    } catch (e) {
      if (e instanceof Error) {
        return e.message
      }
    }
    return ""
  }
}
