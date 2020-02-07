import Story from "./Story"
import Feed from "./Feed"
import { v4 as uuid } from "uuid"

export default class User {
  id: string
  password: string // TODO: Hash this somewhere
  name: string
  alias: string
  followers: User[]
  following: User[]
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
    return this.followers
  }
  getFollower(userId: string): User | undefined {
    return this.followers.find(f => f.id === userId);
  }
  addFollower(user: User): void {
    this.followers.push(user)
  }
  removeFollower(user: User): void {
    this.followers.filter(f => f.id !== user.id)
  }

  // Followers
  getFollowing(): User[] {
    return this.following
  }
  getFollowee(userId: string): User | undefined {
    return this.following.find(f => f.id === userId);
  }
  addFollowing(user: User): void {
    this.following.push(user)
  }
  removeFollowing(user: User): void {
    this.followers.filter(f => f.id !== user.id)
  }
}
