import User from "../model/User"

const users: User[] = [
  new User("fakeEmail@gmail.com", "fakePassword", "Connor Lindsey", "clindsey", "https://source.unsplash.com/1600x900/?person,profile"),
  new User("fakeEmail@gmail.com", "fakePassword", "Robert Jordan", "robby", "https://source.unsplash.com/1600x900/?person,profile"),
  new User("fakeEmail@gmail.com", "fakePassword", "Matt Pope", "matt", "https://source.unsplash.com/1600x900/?person,profile"),
  new User("fakeEmail@gmail.com", "fakePassword", "Trevor Lane", "tlane", "https://source.unsplash.com/1600x900/?person,profile"),
  new User("fakeEmail@gmail.com", "fakePassword", "Charles Goodwin", "cgood", "https://source.unsplash.com/1600x900/?person,profile"),
  new User("fakeEmail@gmail.com", "fakePassword", "Meg Lewis", "darngooood", "https://source.unsplash.com/1600x900/?person,profile"),
]

export default class ServerFacade {
  constructor() {}

  public getUsers() {
    return users
  }

  public getUser() {
    return users[0]
  }
}