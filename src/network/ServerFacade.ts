import User from "../model/User"
import Status from "../model/Status"

// Endpoint
const URL =
  process.env.NODE_ENV === "production"
    ? "https://3kslqr7o7h.execute-api.us-east-1.amazonaws.com/dev"
    : "http://localhost:3000/dev"

export default class ServerFacade {
  /*==============
  Follow Methods
  ==============*/
  public static addFollower = async (
    followerAlias: string,
    followeeAlias: string
  ): Promise<void> => {
    let token = localStorage.getItem("TOKEN")
    if (!token) {
      throw new Error("You must be logged in")
    }

    const res = await fetch(`${URL}/follow`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ followerAlias, followeeAlias }),
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }
  }

  public static removeFollower = async (
    followerAlias: string,
    followeeAlias: string
  ): Promise<void> => {
    let token = localStorage.getItem("TOKEN")
    if (!token) {
      throw new Error("You must be logged in")
    }
    console.log("Follower", followerAlias)
    console.log("Followee", followeeAlias)
    const res = await fetch(`${URL}/unfollow`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ followerAlias, followeeAlias }),
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }
  }

  public static loadMoreFollowers = async (key: string, alias: string): Promise<any> => {
    // Load more followers
    const res = await fetch(`${URL}/followers/${alias}/${key}`, {
      method: "GET",
      mode: "cors",
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    let tmp: User[] = []
    for (let i = 0; i < json.followers.length; i++) {
      try {
        let res = await ServerFacade.getUserByAlias(json.followers[i].followerAlias)
        tmp.push(res)
      } catch (e) {
        throw new Error(e.message)
      }
    }

    let newKey = "noMas"
    if (json.key) newKey = json.key.followerAlias

    return {
      users: tmp,
      key: newKey,
    }
  }

  public static loadMoreFollowing = async (key: string, alias: string): Promise<any> => {
    const res = await fetch(`${URL}/following/${alias}/${key}`, {
      method: "GET",
      mode: "cors",
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    let tmp: User[] = []
    for (let i = 0; i < json.following.length; i++) {
      try {
        let res = await ServerFacade.getUserByAlias(json.following[i].followeeAlias)
        tmp.push(res)
      } catch (e) {
        throw new Error(e.message)
      }
    }

    let newKey = "noMas"
    if (json.key) newKey = json.key.followerAlias

    return {
      users: tmp,
      key: newKey,
    }
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
        Authorization: token,
      },
      body: JSON.stringify({ alias, message }),
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    return json.status
  }

  public static loadMoreStory = async (key: string, alias: string): Promise<any> => {
    // Load more followers
    const res = await fetch(`${URL}/story/${alias}/${key}`, {
      method: "GET",
      mode: "cors",
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    let newKey = "noMas"
    if (json.key) newKey = json.key.createdAt

    let statuses: Status[] = json.story.map((s) => new Status(alias, s.status))
    return {
      statuses,
      key: newKey,
    }
  }

  public static loadMoreFeed = async (key: string, alias: string): Promise<any> => {
    let token = localStorage.getItem("TOKEN")
    if (!token) {
      throw new Error("You must be logged in")
    }
    const res = await fetch(`${URL}/feed/${alias}/${key}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    let newKey = "noMas"
    if (json.key) newKey = json.key.createdAt

    let statuses: Status[] = json.feed.map((s) => new Status(s.authorAlias, s.status))
    return {
      statuses,
      key: newKey,
    }
  }

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
    // Return new user
    return new User(
      json.user.password,
      json.user.name,
      json.user.alias,
      "https://source.unsplash.com/1600x900/?person,mountain,nature"
    )
  }

  public static async updatePicture(file: String): Promise<void> {
    // Validate file
    if (!file) {
      throw new Error("No file uploaded")
    }

    let token = localStorage.getItem("TOKEN")
    if (!token) {
      throw new Error("You must be logged in")
    }
    console.log(file)

    // Upload Image to S3
    let alias = localStorage.getItem("USER_ALIAS") || ""
    const res = await fetch(`${URL}/profileImage`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ alias, file }),
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }
  }

  public static async getUserByAlias(alias: string): Promise<User> {
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
      json.user.photo
    )
  }

  public static async logout(): Promise<string> {
    let token = localStorage.getItem("TOKEN")
    if (!token) {
      throw new Error("You must be logged in")
    }

    let alias = localStorage.getItem("USER_ALIAS") || ""
    const res = await fetch(`${URL}/signout`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({ alias }),
    })
    const json = await res.json()

    // Check for errors
    if (res.status !== 200) {
      throw new Error(json.message)
    }

    return json.message
  }
}
