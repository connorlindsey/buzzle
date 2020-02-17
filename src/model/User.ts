import Story from "./Story"
import Feed from "./Feed"
import { v4 as uuid } from "uuid"
import ServerFacade from "../network/ServerFacade"

export default class User {
  id: string
  password: string // TODO: Hash this somewhere
  name: string
  alias: string
  followers: string[]
  following: string[]
  story: Story
  feed: Feed
  photo: string

  constructor(password: string, name: string, alias: string, photo: string) {
    this.id = uuid()
    this.password = password
    this.name = name
    this.alias = alias
    this.followers = []
    this.following = []
    this.story = new Story()
    this.feed = new Feed()
    this.photo = photo
  }

  // ID
  get ID(): string {
    return this.id
  }

  // Password
  setPassword(password: string) {
    this.password = password
  }
  getPassword() {
    return this.password
  }

  // Name
  setName(name: string) {
    this.name = name
  }
  getName() {
    return this.name
  }

  // Alias
  setAlias(alias: string) {
    this.alias = alias
  }
  getAlias() {
    return this.alias
  }

  // Followers
  getFollowers(): User[] {
    let users: User[] = []
    this.followers.forEach(a => {
      let user = ServerFacade.getUserByAlias(a)
      if (user) users.push(user)
    })
    return users
  }
  getFollower(alias: string): User | undefined | null {
    if (this.followers.includes(alias)) {
      return ServerFacade.getUserByAlias(alias);
    }
    return null;
  }
  addFollower(alias: string): void {
    this.followers.push(alias)
  }
  removeFollower(alias: string): void {
    this.followers = this.followers.filter(a => a !== alias)
  }

  // Followers
  getFollowing(): User[] {
    let users: User[] = []
    this.following.forEach(a => {
      let user = ServerFacade.getUserByAlias(a)
      if (user) users.push(user)
    })
    return users
  }
  getFollowee(alias: string): User | undefined | null {
    if (this.following.includes(alias)) {
      return ServerFacade.getUserByAlias(alias);
    }
    return null;
  }
  addFollowing(alias: string): void {
    if (!alias) return;
    this.following.push(alias)
  }
  removeFollowing(alias: string): void {
    if (!alias) return;
    this.following = this.following.filter(f => f !== alias)
  }
}
