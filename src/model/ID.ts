export default class ID {
  id: string

  constructor() {
    this.id = Math.random().toString()
  }

  getID() {
    return this.id
  }
}