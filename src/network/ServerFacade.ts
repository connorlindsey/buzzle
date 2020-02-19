import User from "../model/User"
import Status from "../model/Status"
import StatusService from "../services/StatusService"

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

  public static loadMoreFollowers = async (): Promise<string> => {
    // TODO: Actually call the server for more followers
    // If more are available, add them to the user's followers
    return "No more followers to load"
  }

  public static loadMoreFollowing = async (): Promise<string> => {
    // TODO: Actually call the server for more following
    // If more are available, add them to the user's following
    return "You aren't following any more users"
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

  public static loadMoreStory = async (): Promise<void> => {
    // TODO: Actually call the server for more statuses
    // if (true) {
    //   throw new Error("No more statuses to load")
    // }
    // If more are available, add them to the user's story
    StatusService.createStatus("I think this is sweet")
    StatusService.createStatus("Here's a link to my startup 🚀")
    StatusService.createStatus("Nice to see you @cgood")
    StatusService.createStatus("Hey there!")
    StatusService.createStatus("Awww yeah")
    StatusService.createStatus("Lots of statuses")
    StatusService.createStatus("Even more 🔥 takes")
    StatusService.createStatus("Happy birthday Buzzle 🍰🥳")
  }

  public static loadMoreFeed = async (): Promise<string> => {
    // TODO: Actually call the server for more statuses
    // If more are available, add them to the user's feed
    return "No more statuses"
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
