import User from "../model/User"
import Status from "../model/Status"

// Dummy data
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
  public static addFollower = async (followerAlias: string, followeeAlias: string): Promise<void> => {
    let follower = await ServerFacade.getUserByAlias(followerAlias);
    let followee = await ServerFacade.getUserByAlias(followeeAlias);

    // Follower is not following followee
    follower?.addFollowing(followeeAlias);
    // Followee now has "follower" as a follower
    followee?.addFollower(followerAlias);
  }

  public static removeFollower = async (followerAlias: string, followeeAlias: string): Promise<void> => {
    let follower = await ServerFacade.getUserByAlias(followerAlias);
    let followee = await ServerFacade.getUserByAlias(followeeAlias);

    // Follower is no longer following followee
    follower?.removeFollowing(followeeAlias);
    // Followee no longer lists "follower" as a follower
    followee?.removeFollower(followerAlias);
  }

  public static loadMoreFollowers = async (pag: number, ID: string): Promise<User[]> => {
    // TODO: Actually call the server for more statuses
    if (false) {
      throw new Error("No more followers to load")
    }
    let user = await ServerFacade.getUserByID(ID);
    return await user.getFollowers()
  }

  public static loadMoreFollowing = async (pag: number, ID: string): Promise<User[]> => {
    // TODO: Actually call the server for more statuses
    if (false) {
      throw new Error("No more following to load")
    }
    let user = await ServerFacade.getUserByID(ID);
    return await user.getFollowing()
  }

  /*==============
  Status Methods
  ==============*/
  public static createStatus = async (message: string): Promise<void> => {
    let ID = localStorage.getItem("USER_ID")
    let user = ServerFacade.users.find(u => u.id === ID)
    if (!user || !ID) {
      throw new Error("You must be logged in")
    }
    // Create status
    let status = new Status(user.alias, message)

    // Add status to user's story
    user.story.addStatus(status)

    // Add status to follower's feeds
    user.followers.forEach(async alias => {
      let follower: User = await ServerFacade.getUserByAlias(alias)
      follower.feed.addStatus(status)
    })
  }

  public static loadMoreStory = async (pag: number, ID: string): Promise<Status[]> => {
    // TODO: Actually call the server for more statuses
    if (false) {
      throw new Error("No more statuses to load")
    }
    let user = await ServerFacade.getUserByID(ID);
    user.story.loadStatuses([
      new Status(user.alias, "I think this is sweet"),
      new Status(user.alias, "Here's a link to my startup 🚀"),
      new Status(user.alias, "Happy birthday Buzzle 🍰🥳")
    ])
    return user.story.statuses
  }

  public static loadMoreFeed = async (pag: number, ID: string): Promise<Status[]> => {
    // TODO: Actually call the server for more statuses
    // If more are available, add them to the user's feed
    if (false) {
      throw new Error("No more statuses to load")
    }
    let user = await ServerFacade.getUserByID(ID);
    // user.feed.loadStatuses([
    //   new Status(user.alias, "I think this is sweet"),
    //   new Status(user.alias, "Here's a link to my startup 🚀"),
    //   new Status(user.alias, "Happy birthday Buzzle 🍰🥳")
    // ])
    return user.feed.statuses
  }

  /*==============
  Auth Methods
  ==============*/
  public static async login(alias: string, password: string): Promise<User> {
    let user = this.users.find(u => u.alias === alias)
    if (user === null || user === undefined) {
      throw new Error("User not found")
    }
    if (user?.password !== password) {
      throw new Error("Incorrect password")
    }
    return user
  }

  public static async signup(name: string, alias: string, password: string): Promise<User> {
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

    // TODO: Implement this with Lambda / S3
    // Send image to lambda to upload to S3
    // const formData = new FormData()
    // formData.append("profilePicture", file, file.name)
    // const res = await fetch("endpoint", {
    //   method: "POST",
    //   body: formData,
    // })
    // const json = await res.json()
    // console.log("Update picture", json)
    let URL = "https://source.unsplash.com/1600x900/?person,mountain,nature"
    user.photo = URL
  }

  public static async getUsers() {
    return this.users
  }

  public static async getUser() {
    return this.users[0]
  }

  public static async getUserByAlias(alias: string): Promise<User> {
    let user = this.users.find(u => u.alias === alias)
    if (!user) {
      throw new Error("User not found")
    }
    return user
  }

  public static async getUserByID(ID: string): Promise<User> {
    let user = this.users.find(u => u.id === ID)
    if (!user) {
      throw new Error("User not found")
    }
    return user
  }
}
