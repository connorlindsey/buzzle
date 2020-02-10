import User from "../model/User"
import Status from "../model/Status"

const userA: User = new User(
  "test",
  "Connor Lindsey",
  "clindsey",
  "https://source.unsplash.com/1600x900/?person,mountain,nature"
)
const userB: User = new User(
  "test",
  "Robert Jordan",
  "robby",
  "https://source.unsplash.com/1600x900/?person,mountain,nature"
)
const userC: User = new User(
  "test",
  "Matt Pope",
  "matt",
  "https://source.unsplash.com/1600x900/?person,mountain,nature"
)
const userD: User = new User(
  "test",
  "Trevor Lane",
  "tlane",
  "https://source.unsplash.com/1600x900/?person,mountain,nature"
)
const userE: User = new User(
  "test",
  "Charles Goodwin",
  "cgood",
  "https://source.unsplash.com/1600x900/?person,mountain,nature"
)

export default class ServerFacade {
  static users: User[] = [userA, userB, userC, userD, userE]
  /*==============
  Follow Methods
  ==============*/
  public static addFollower = (followerAlias: string, followeeAlias: string): void => {
    let follower = ServerFacade.getUserByAlias(followerAlias);
    let followee = ServerFacade.getUserByAlias(followeeAlias);

    follower?.addFollowing(followeeAlias);
    followee?.addFollower(followerAlias);
  }

  /*==============
  Status Methods
  ==============*/
  public static createStatus = (message: string): void => {
    let ID = localStorage.getItem("USER_ID")
    let user = ServerFacade.users.find(u => u.id === ID)
    console.log("Create status: ", user)
    if (!user || !ID) {
      throw new Error("You must be logged in")
    }
    // Create status
    let status = new Status(user.alias, message)

    // Add status to user's story
    user.story.addStatus(status)

    // Add status to follower's feeds
    user.followers.forEach(alias => {
      let follower: User | null = ServerFacade.getUserByAlias(alias)
      if (follower) {
        follower.feed.addStatus(status)
      }
    })
  }

  /*==============
  Auth Methods
  ==============*/
  public static login(alias: string, password: string): User {
    let user = this.users.find(u => u.alias === alias)
    if (user === null || user === undefined) {
      throw new Error("User not found")
    }
    if (user?.password !== password) {
      throw new Error("Incorrect password")
    }
    return user
  }

  public static signup(name: string, alias: string, password: string): User {
    let user = this.users.find(u => u.alias === alias)
    if (user) {
      throw new Error("Alias already taken")
    }
    user = new User(password, name, alias, "")
    this.users.push(user)
    return user
  }

  public static async updatePicture(id: string, file: File): Promise<void> {
    // Validate file
    if (!file) {
      throw new Error("No file uploaded")
    }

    // Find user
    let user = this.users.find(u => u.id === id)
    if (!user) {
      throw new Error("User not found")
    }

    // Send image to lambda to upload to S3
    // const formData = new FormData()
    // formData.append("profilePicture", file, file.name)
    // const res = await fetch("endpoint", {
    //   method: "POST",
    //   body: formData,
    // })
    // const json = await res.json()
    // console.log("Update picture", json)
    let URL = "https://source.unsplash.com/1600x900/?person,mountain,nature" // TODO: Get URL back from lambda
    user.photo = URL
  }

  public static getUsers() {
    return this.users
  }

  public static getUser() {
    return this.users[0]
  }

  public static getUserByAlias(alias: string): User | null {
    let user = this.users.find(u => u.alias === alias)
    if (!user) {
      // return null // TODO: Fix this
      localStorage.setItem("USER_ID", this.users[0].id)
      return this.users[0];
    }
    return user
  }

  public static getUserByID(ID: string): User | null {
    let user = this.users.find(u => u.id === ID)
    if (!user) {
      // return null // TODO: Fix this
      localStorage.setItem("USER_ID", this.users[0].id)
      return this.users[0];
    }
    return user
  }
}
