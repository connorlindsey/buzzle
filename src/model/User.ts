import Alias from "./Alias"
import Story from "./Story"
import Feed from "./Feed"
import ID from "./ID"

export default class User {
  id: ID
  email: string
  password: string // TODO: Hash this somewhere
  name: string
  alias: Alias
  followers: ID[]
  following: ID[]
  story: Story
  feed: Feed
  photo: string

  constructor(email: string, password: string, name: string, alias: string, photo: string) {
    this.id = new ID()
    this.email = email
    this.password = password
    this.name = name
    this.alias = new Alias(alias)
    this.followers = []
    this.following = []
    this.story = new Story()
    this.feed = new Feed()
    this.photo = photo
  }

  // ID
  getID() {
    return this.id
  }

  // Email
  setEmail(email: string) {
    this.email = email
  }
  getEmail() {
    return this.email
  }

  // Password
  setPassword(password: string) {
    // TODO: Hash here maybe?
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
    this.alias = new Alias(alias)
  }
  getAlias() {
    return this.alias
  }

  // Followers
  getFollowers() {
    return this.followers
  }
  addFollower(userId: ID) {
    this.followers.push(userId)
  }
  removeFollower(userId: ID) {
    this.followers.filter(followerID => followerID !== userId)
  }

  // Followers
  getFollowing() {
    return this.following
  }
  addFollowing(userId: ID) {
    this.following.push(userId)
  }
  removeFollowing(userId: ID) {
    this.following.filter(followeeID => followeeID !== userId)
  }
}
