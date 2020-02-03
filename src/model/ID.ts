import { v4 as uuid } from 'uuid';

export default class ID {
  id: string

  constructor() {
    this.id = uuid()
  }

  getID() {
    return this.id
  }
}