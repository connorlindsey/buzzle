import React, { useState, useEffect, useCallback } from 'react'
import User from "../../model/User"
import FollowerCard from './FollowerCard'
import Button from "../style/Button"

interface FollowListProps {
  user: User
  followers: boolean
}

// Display a list of users whether they are followers or following
const FollowList: React.FC<FollowListProps> = ({ user, followers }) => {
  const [users, setUsers] = useState<User[]>([])
  const getUsers = useCallback(
    async () => {
      let users = [];
      if (followers) {
        users = await user?.getFollowers();
      } else {
        users = await user.getFollowing();
      }
      setUsers(users);
    },
    [followers, user],
  )

  useEffect(() => {
    getUsers()
  }, [getUsers, user.followers, user.following])

  if (!user) {
    return (<div>No users found</div>)
  }
  return (
    <div>
      {users.length === 0 && <div>No users found :(</div>}
      {users.length > 0 && (
        <React.Fragment>
          {users.map(user => <FollowerCard follower={user} key={user.id} />)}
          <Button>Load more</Button>
        </React.Fragment>
      )}
    </div>
  )
}

export default FollowList
