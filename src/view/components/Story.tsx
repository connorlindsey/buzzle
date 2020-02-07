import React, { useState, useEffect } from 'react'
import Story from '../../model/Story'
import ServerFacade from '../../network/ServerFacade'
import AStatus from './AStatus'

interface StoryProps {
  ID?: string | null | undefined
}

const StoryView: React.FC<StoryProps> = ({ ID }) => {
  // Load the user feed
  const [userStory, setUserStory] = useState<Story>()
  useEffect(() => {
    if (!ID) {
      // eslint-disable-next-line
      ID = localStorage.getItem("USER_ID");
    }
    if (ID) {
      let user = ServerFacade.getUserByID(ID)
      if (user) {
        setUserStory(user.story)
      }
    }
  }, [ID, userStory])

  if (!userStory) {
    return (<div><h3>An error has occurred</h3></div>)
  }

  return (
    <div>
      {userStory.statuses.map((s, i) => <AStatus status={s} key={i} />)}
    </div>
  )
}

export default StoryView
