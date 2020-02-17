import React from 'react'
import User from "../../model/User"
import FollowerCard from './FollowerCard'

interface FollowListProps {
  users: User[] | null | undefined
}

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
