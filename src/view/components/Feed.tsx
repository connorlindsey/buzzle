import React, { useState, useEffect } from 'react'
import Feed from "../../model/Feed"
import ServerFacade from '../../network/ServerFacade'
import AStatus from './AStatus'

interface FeedProps {
  ID?: string | null
}

// Component which renders a list of statuses
const FeedView: React.FC<FeedProps> = ({ ID }) => {
  // Load the user feed
  const [userFeed, setUserFeed] = useState<Feed>()
  useEffect(() => {
    if (!ID) {
      // eslint-disable-next-line
      ID = localStorage.getItem("USER_ID");
    }
    if (ID) {
      let user = ServerFacade.getUserByID(ID)
      if (user) {
        setUserFeed(user.feed)
      }
    }
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
