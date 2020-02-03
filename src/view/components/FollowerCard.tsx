import React from 'react'
import User from "../../model/User"

interface ComponentProps {
  follower: User
}

const FollowerCard: React.FC<ComponentProps> = ({ follower }) => {
  return (
    <div>
      {follower.name}
    </div>
  )
}

export default FollowerCard
