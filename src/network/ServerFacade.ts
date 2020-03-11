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

// Endpoint
const URL = "https://3kslqr7o7h.execute-api.us-east-1.amazonaws.com/dev"

export default class ServerFacade {
  static users: User[] = [userA, userB, userC, userD, userE]
  /*==============
  Follow Methods
  ==============*/
  public static addFollower = async (
    followerAlias: string,
    followeeAlias: string
  ): Promise<void> => {

    console.log("Adding followeer in facade");
    let follower = await ServerFacade.getUserByAlias(followerAlias)
    let followee = await ServerFacade.getUserByAlias(followeeAlias)

    // Follower is not following followee
    follower?.addFollowing(followeeAlias)
    // Followee now has "follower" as a follower
    followee?.addFollower(followerAlias)
  }

  public static removeFollower = async (
    followerAlias: string,
    followeeAlias: string
  ): Promise<void> => {
    console.log("Removing followeer in facade");
    let follower = await ServerFacade.getUserByAlias(followerAlias)
    let followee = await ServerFacade.getUserByAlias(followeeAlias)

    // Follower is no longer following followee
    follower?.removeFollowing(followeeAlias)
    // Followee no longer lists "follower" as a follower
    followee?.removeFollower(followerAlias)
  }

  public static loadMoreFollowers = async (pag: number, alias: string): Promise<User[]> => {
    // Load more followers
    const res = await fetch(`${URL}/followers/${alias}`, {
      method: "GET",
      mode: "cors",
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    return json.followers.map(u => new User(u.password, u.name, u.alias, u.photo))
  }

  public static loadMoreFollowing = async (pag: number, alias: string): Promise<User[]> => {
    // Load more followers
    const res = await fetch(`${URL}/following/${alias}`, {
      method: "GET",
      mode: "cors",
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    return json.following.map(u => new User(u.password, u.name, u.alias, u.photo))
  }

  public static isFollowing = async (userA: string, userB: string): Promise<boolean> => {
    const res = await fetch(`${URL}/following/is/${userA}/following/${userB}`, {
      method: "GET",
      mode: "cors",
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    return json.following
  }

  /*==============
  Status Methods
  ==============*/
  public static createStatus = async (alias: string, message: string): Promise<void> => {
    let token = localStorage.getItem("TOKEN")
    if (!token) {
      throw new Error("You must be logged in")
    }

    const res = await fetch(`${URL}/status`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ alias, message }),
    })
    const json = await res.json();

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    return json.status
  }

  public static loadMoreStory = async (pag: number, alias: string): Promise<Status[]> => {
    // Load more followers
    const res = await fetch(`${URL}/story/${alias}`, {
      method: "GET",
      mode: "cors",
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    return json.story.map(s => new Status(alias, s))
  }

  public static loadMoreFeed = async (pag: number, alias: string): Promise<Status[]> => {
    // Load more followers    
    
    let token = localStorage.getItem("TOKEN")
    if (!token) {
      throw new Error("You must be logged in")
    }
    console.log("Getting feed", token)
    const res = await fetch(`${URL}/feed/${alias}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    return json.feed.map(s => new Status(s.alias, s.message))
  }
  //
  /*==============
  Auth Methods
  ==============*/
  public static async login(alias: string, password: string): Promise<User> {
    // Make login request
    const res = await fetch(`${URL}/signin`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ alias, password }),
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    // Set auth Token
    localStorage.setItem("TOKEN", json.token)

    // Return new user
    return new User(
      json.user.password,
      json.user.name,
      json.user.alias,
      "https://source.unsplash.com/1600x900/?person,mountain,nature"
    )
  }

  public static async signup(name: string, alias: string, password: string): Promise<User> {
    // Make signup request
    const res = await fetch(`${URL}/signup`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ alias, password, name }),
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    // Set auth Token
    localStorage.setItem("TOKEN", json.token)
    console.log("Encrypted password: ", json.user.password);
    // Return new user
    return new User(
      json.user.password,
      json.user.name,
      json.user.alias,
      "https://source.unsplash.com/1600x900/?person,mountain,nature"
    )
  }

  public static async updatePicture(file: File): Promise<void> {
    // Validate file
    if (!file) {
      throw new Error("No file uploaded")
    }

    let token = localStorage.getItem("TOKEN")
    if (!token) {
      throw new Error("You must be logged in")
    }

    // Upload Image to S3
    // TODO: Include authToken
    // const formData = new FormData()
    // formData.append("profilePicture", file, file.name)
    const res = await fetch(`${URL}/profileImage`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ message: "HEELLO" }),
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }
  }

  public static async getUserByAlias(alias: string): Promise<User> {
    console.log("Getting user")
    if (!alias) {
      throw new Error("Unexpected error")
    }

    // Make signup request
    const res = await fetch(`${URL}/user/${alias}`, {
      method: "GET",
      mode: "cors",
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    // Return new user
    return new User(
      "No password",
      json.user.name,
      json.user.alias,
      "https://source.unsplash.com/1600x900/?person,mountain,nature"
    )
  }

  public static async logout(): Promise<string> {
    let token = localStorage.getItem("TOKEN")
    if (!token) {
      throw new Error("You must be logged in")
    }

    const res = await fetch(`${URL}/signout`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: token,
      },
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    return json.message
  }
}
