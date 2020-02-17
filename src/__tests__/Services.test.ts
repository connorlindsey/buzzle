import UserService from "../services/UserService"
import FollowerService from "../services/FollowerService"
import ServerFacade from "../network/ServerFacade"
import StatusService from "../services/StatusService"

describe("User Service", () => {
  // Sign up a user
  it("Sign up success", () => {
    let message = UserService.signup("New name", "myAlias", "pass")
    expect(message).toBe("")

    let ID = localStorage.getItem("USER_ID")
    expect(ID).not.toBeNull()
  })

  it("Sign up failure", () => {
    let message = UserService.signup("New name", "myAlias", "pass")
    expect(message).toBe("Alias already taken")
  })

  // Logout
  it("Logout success", () => {
    UserService.logout()
    let ID = localStorage.getItem("USER_ID")
    expect(ID).toBeNull()
  })

  // Sign in
  it("Sign in success", () => {
    let message = UserService.login("myAlias", "pass")
    expect(message).toBe("")

    let ID = localStorage.getItem("USER_ID")
    expect(ID).not.toBeNull()
  })

  it("Sign in failure - password", () => {
    let message = UserService.login("myAlias", "notMyPassword")
    expect(message).toBe("Incorrect password")
  })

  // Get current user by ID
  it("Get current user", () => {
    let user = UserService.getCurrentUser()
    expect(user).not.toBeNull()
  })
})

describe("Follower Service", () => {
  // Follow a few users
  it("Follow success", () => {
    FollowerService.addFollower(ServerFacade.users[0].alias)
    FollowerService.addFollower(ServerFacade.users[1].alias)
    FollowerService.addFollower(ServerFacade.users[2].alias)

    let user = UserService.getCurrentUser();
    expect(user?.following.length).toBe(3)
    expect(user?.following).toContain(ServerFacade.users[0].alias)
    expect(user?.following).toContain(ServerFacade.users[1].alias)
    expect(user?.following).toContain(ServerFacade.users[2].alias)
  })

  it("Be followed success", () => {
    let user = UserService.getCurrentUser();
    let alias = user?.alias || ""
    FollowerService.addFollowerManual(ServerFacade.users[0].alias, alias)
    FollowerService.addFollowerManual(ServerFacade.users[1].alias, alias)

    expect(user?.followers.length).toBe(2)
  })

  // Unfollow a user
  it("Unfollow Success", () => {
    FollowerService.removeFollower(ServerFacade.users[0].alias)

    let user = UserService.getCurrentUser();
    expect(user?.following.length).toBe(2)
    expect(user?.following).not.toContain(ServerFacade.users[0].alias)
  })

  // Check isFollowing
  it("Check is following", () => {
    let ID = localStorage.getItem("USER_ID") || ""
    let res = UserService.checkIsFollowing(ID, ServerFacade.users[0].alias)
    expect(res).toBe(false)

    res = UserService.checkIsFollowing(ID, ServerFacade.users[1].alias)
    expect(res).toBe(true)

    res = UserService.checkIsFollowing(ID, ServerFacade.users[2].alias)
    expect(res).toBe(true)
  })
})

describe("Status Service", () => {
  // Post a status
  it("Post status success", () => {
    // Post 1 status
    let result = StatusService.createStatus("This is my status message")
    expect(result).toBe("")

    // Post another
    result = StatusService.createStatus("This is my status message")
    expect(result).toBe("")
  })

  it("Status is in story", () => {
    let user = UserService.getCurrentUser()
    expect(user?.story.statuses.length).toBe(2)
  })

  // Check feed
  it("Status is in follower's feed", () => {
    let user = UserService.getCurrentUser()

    expect(ServerFacade.users[0].feed.statuses.length).toBe(2)
    expect(ServerFacade.users[1].feed.statuses.length).toBe(2)
  })
})
