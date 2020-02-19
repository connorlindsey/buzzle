import React, { useState, useEffect } from 'react'
import Feed from "../../model/Feed"
import AStatus from './AStatus'
import UserService from '../../services/UserService'

interface FeedProps {
  ID?: string | null
}

// Component which renders a list of statuses
const FeedView: React.FC<FeedProps> = ({ ID }) => {
  // Load the user feed
  const [userFeed, setUserFeed] = useState<Feed>()
  const getUserFeed = async () => {
    try {

      const user = await UserService.getCurrentUser();
      setUserFeed(user.feed)
    } catch (e) {
      setUserFeed(new Feed())
    }
  }
  useEffect(() => {
    getUserFeed()
  }, [ID, userFeed])

  if (!userFeed) {
    return (<div><h3>An error has occurred</h3></div>)
  }
  return (
    <div>
      {userFeed.statuses.length === 0 && <h3>Nothing to see here. Go follow some people!</h3>}
      {userFeed.statuses.map((s, i) => <AStatus status={s} key={i} />)}
    </div>
  )
}

export default FeedView
