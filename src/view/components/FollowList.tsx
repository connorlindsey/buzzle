import React, { useState, useEffect } from 'react'
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
  const [users, setUsers] = useState<any[]>([])
  const [status, setStatus] = useState<STATUS>(STATUS.DEFAULT)
  const [message, setMessage] = useState<string>()
  const [key, setKey] = useState("nada")

  // Load user list on initial render
  useEffect(() => {
    async function getUsers() {
      setKey("nada")
      setUsers([])
      setStatus(STATUS.LOADING)

      // Get user alias if this is the home screen
      // eslint-disable-next-line
      if (!alias) alias = localStorage.getItem("USER_ALIAS") || "";

      try {
        if (followers) {
          const { users, key: newKey } = await FollowerService.loadMoreFollowers("nada", alias)
          setUsers(users)
          setKey(newKey)
        } else {
          console.log("Get initial following")
          const { users, key: newKey } = await FollowerService.loadMoreFollowing("nada", alias)
          console.log('users', users)
          console.log(key)
          setUsers(users);
          setKey(newKey);
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
    }
    getUsers()
  }, [followers])

  const loadMore = async () => {
    setStatus(STATUS.LOADING)

    // Get user alias if this is the home screen
    // eslint-disable-next-line
    if (!alias) alias = localStorage.getItem("USER_ALIAS") || "";

    try {
      if (followers) {
        const { users: newUsers, key: newKey } = await FollowerService.loadMoreFollowers(key, alias)
        setUsers([...users, ...newUsers])
        setKey(newKey)
      } else {
        const { users: newUsers, key: newKey } = await FollowerService.loadMoreFollowing(key, alias)
        setUsers([...users, ...newUsers]);
        setKey(newKey);
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
  }

  if (status === STATUS.LOADING && users.length <= 0) {
    return (<div><h3>Loading...</h3></div>)
  }

  if (users.length <= 0) {
    return (<div>No users found :(</div>)
  }

  return (
    <div>
      {users.map((user, i) => <FollowerCard follower={user} key={i} />)}
      <Button margin="1rem auto" onClick={loadMore} disabled={status === STATUS.LOADING || key === "noMas"}>{status === STATUS.LOADING ? "Loading..." : "See more"}</Button>
      {message && <h3>{message}</h3>}
    </div>
  )
}

export default FollowList
