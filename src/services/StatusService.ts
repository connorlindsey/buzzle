import ServerFacade from "../network/ServerFacade"

export default class StatusService {
  static createStatus = (message: string): string => {
    try {
      ServerFacade.createStatus(message);
    } catch (e) {
      if (e instanceof Error) {
        return e.message
      }
    }
    return ""
  }
}
