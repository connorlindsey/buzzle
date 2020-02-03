import React from 'react'
import User from "../../model/User"
import FollowerCard from './FollowerCard'

interface FollowListProps {
  users: User[]
}

const FollowList: React.FC<FollowListProps> = ({ users }) => {
  return (
    <div>
      {users.length === 0 && <div>No users found :(</div>}
      {users.length > 0 && users.map(user => <FollowerCard follower={user} />)}
    </div>
  )
}

export default FollowList
