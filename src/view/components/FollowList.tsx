import React from 'react'
import User from "../../model/User"
import FollowerCard from './FollowerCard'

interface FollowListProps {
  users: User[] | null | undefined
}

// Display a list of users whether they are followers or following
const FollowList: React.FC<FollowListProps> = ({ users }) => {
  if (!users) {
    return (<div>No users found</div>)
  }
  return (
    <div>
      {users.length === 0 && <div>No users found :(</div>}
      {users.length > 0 && users.map(user => <FollowerCard follower={user} key={user.id} />)}
    </div>
  )
}

export default FollowList
