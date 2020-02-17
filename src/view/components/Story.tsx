import React, { useState, useEffect } from 'react'
import Story from '../../model/Story'
import ServerFacade from '../../network/ServerFacade'
import AStatus from './AStatus'
import Button from "../style/Button"
import StatusService from '../../services/StatusService'

interface StoryProps {
  ID?: string | null
}

enum STATUS {
  DEFAULT,
  LOADING,
  ERROR
}

const StoryView: React.FC<StoryProps> = ({ ID }) => {
  // Load the user story
  const [userStory, setUserStory] = useState<Story>()
  const [status, setStatus] = useState<STATUS>(STATUS.DEFAULT)
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

  const loadStatuses = (): void => {
    setStatus(STATUS.LOADING)
    const result = StatusService.loadStatuses()
    if (result) {
      // An error has ocurred
    setStatus(STATUS.ERROR)
    }
    setStatus(STATUS.DEFAULT)
  }

  // Check if the story exists
  if (!userStory) {
    return (<div><h3>An error has occurred</h3></div>)
  }

  // Check if the story has statuses
  if (userStory.statuses.length <= 0) {
    return <h3>Nothing to see here. Go post a status!</h3>
  }

  return (
    <div>
      {userStory.statuses.map((s, i) => <AStatus status={s} key={i} />)}
      <Button margin="1rem auto" onClick={loadStatuses}>{STATUS.LOADING ? "Loading..." : "See more"}</Button>
    </div>
  )
}

export default StoryView
