import Story from "./Story"
import Feed from "./Feed"
import ServerFacade from "../network/ServerFacade"

export default class User {
  id: string
  password: string // Hashed on backend and verified using JWT
  name: string
  alias: string
  followers: string[]
  following: string[]
  story: Story
  feed: Feed
  photo: string

  constructor(password: string, name: string, alias: string, photo: string) {
    this.id = "alskdjf"
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
    this.followers.forEach(async a => {
      let user = await ServerFacade.getUserByAlias(a)
      users.push(user)
    })
    return users
  }
  async getFollower(alias: string): Promise<User> {
    if (this.followers.includes(alias)) {
      return await ServerFacade.getUserByAlias(alias);
    }
    throw new Error("Follower not found")
  }
  addFollower(alias: string): void {
    if (!alias || this.followers.includes(alias) || alias === this.alias) return;
    this.followers = [...this.followers, alias]
  }
  removeFollower(alias: string): void {
    this.followers = this.followers.filter(a => a !== alias)
  }

  // Followers
  getFollowing(): User[] {
    let users: User[] = []
    this.following.forEach(async a => {
        let user = await ServerFacade.getUserByAlias(a)
        users.push(user)
    })
    return users
  }
  async getFollowee(alias: string): Promise<User> {
    if (this.following.includes(alias)) {
      return await ServerFacade.getUserByAlias(alias);
    }
    throw new Error("Followee not found")
  }
  addFollowing(alias: string): void {
    if (!alias || this.following.includes(alias) || alias === this.alias) return;
    this.following = [...this.following, alias]
  }
  removeFollowing(alias: string): void {
    if (!alias) return;
    this.following = this.following.filter(f => f !== alias)
  }
}
