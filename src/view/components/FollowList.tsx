import React, { useState, useEffect, useCallback } from 'react'
import User from "../../model/User"
import FollowerCard from './FollowerCard'
import Button from "../style/Button"
import FollowerService from '../../services/FollowerService'
import UserService from '../../services/UserService'

interface FollowListProps {
  ID?: string | null
  followers: boolean
}

enum STATUS {
  DEFAULT,
  LOADING,
  ERROR
}

// Display a list of users whether they are followers or following
const FollowList: React.FC<FollowListProps> = ({ ID, followers }) => {
  const [users, setUsers] = useState<User[]>([])
  const [status, setStatus] = useState<STATUS>(STATUS.DEFAULT)
  const [message, setMessage] = useState<string>()
  const [pag, setPag] = useState(0)
  const [user, setUser] = useState<User>()

  const getUsers = useCallback(
    async () => {
      if (!ID) {
        // eslint-disable-next-line
        ID = localStorage.getItem("USER_ID") || "";
      }
      try {
        // TODO: Get more users if pagination has increased
        setUser(await UserService.getUserByID(ID));
        if (followers) {
          setUsers(await FollowerService.loadMoreFollowers(pag, ID))
        } else {
          setUsers(await FollowerService.loadMoreFollowing(pag, ID))
        }
        setStatus(STATUS.DEFAULT)
      } catch (e) {
        if (e instanceof Error) {
          setMessage(e.message);
          setStatus(STATUS.DEFAULT)
          setTimeout(() => {
            setMessage("")
          }, 1500)
        }
      }
    },
    [followers],
  )

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line
  }, [getUsers, pag, user?.followers, user?.following])

  if (users.length <= 0) {
    return (<div>No users found :(</div>)
  }
  return (
    <div>
      {users.map(user => <FollowerCard follower={user} key={user.id} />)}
      <Button margin="1rem auto" onClick={() => setPag(pag + 1)}>{status === STATUS.LOADING ? "Loading..." : "See more"}</Button>
      {message && <h3>{message}</h3>}
    </div>
  )
}

export default FollowList
