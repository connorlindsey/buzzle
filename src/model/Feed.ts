import Status from "./Status"

export default class Feed {
  statuses: Status[]

  constructor() {
    this.statuses = []
  }

  addStatus(status: Status) {
    this.statuses.unshift(status);
  }
}