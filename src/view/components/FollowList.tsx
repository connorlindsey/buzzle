import React, { useState, useEffect, useCallback } from 'react'
import User from "../../model/User"
import FollowerCard from './FollowerCard'
import Button from "../style/Button"
import FollowerService from '../../services/FollowerService'

interface FollowListProps {
  alias?: string | null
  followers: boolean
}

enum STATUS {
  DEFAULT,
  LOADING,
  ERROR
}

// Display a list of users whether they are followers or following
const FollowList: React.FC<FollowListProps> = ({ alias, followers }) => {
  const [users, setUsers] = useState<User[]>([])
  const [status, setStatus] = useState<STATUS>(STATUS.DEFAULT)
  const [message, setMessage] = useState<string>()
  const [pag, setPag] = useState(0)

  const getUsers = useCallback(
    async () => {
      setStatus(STATUS.LOADING)
      if (!alias) {
        // eslint-disable-next-line
        alias = localStorage.getItem("USER_ALIAS") || "";
      }
      try {
        // TODO: Get more users if pagination has increased
        if (followers) {
          setUsers(await FollowerService.loadMoreFollowers(pag, alias))
        } else {
          setUsers(await FollowerService.loadMoreFollowing(pag, alias))
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
  }, [getUsers, pag])

  if (status === STATUS.LOADING && users.length <= 0) {
    return (<div><h3>Loading...</h3></div>)
  }

  if (users.length <= 0) {
    return (<div>No users found :(</div>)
  }

  return (
    <div>
      {users.map(user => <FollowerCard follower={user} key={user.alias} />)}
      <Button margin="1rem auto" onClick={() => setPag(pag + 1)} disabled={status === STATUS.LOADING}>{status === STATUS.LOADING ? "Loading..." : "See more"}</Button>
      {message && <h3>{message}</h3>}
    </div>
  )
}

export default FollowList
