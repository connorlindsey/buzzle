import Status from "./Status"

export default class Story {
  statuses: Status[]

  constructor() {
    this.statuses = []
  }

  addStatus(status: Status) {
    this.statuses.unshift(status)
  }

  loadStatuses(statuses: Status[]) {
    this.statuses = [...this.statuses, ...statuses]
  }
}
