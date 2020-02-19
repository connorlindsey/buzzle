import Status from "./Status"

// Collection of statuses from users that a user is following
export default class Feed {
  statuses: Status[]

  constructor() {
    this.statuses = []
  }

  // Adds a status to the beginning of the user's feed
  addStatus(status: Status) {
    this.statuses.unshift(status);
  }

  loadStatuses(statuses: Status[]) {
    this.statuses = [...this.statuses, ...statuses]
  }
}