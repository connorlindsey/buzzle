import React, { useState, useEffect, useCallback } from 'react'
import AStatus from './AStatus'
import Button from "../style/Button"
import StatusService from '../../services/StatusService'
import Status from '../../model/Status'

interface FeedProps {
  ID?: string | null
}

enum STATUS {
  DEFAULT,
  LOADING,
  ERROR
}

// Component which renders a list of statuses
const FeedView: React.FC<FeedProps> = ({ ID }) => {
  // Load the user feed
  const [statuses, setStatuses] = useState<Status[]>([])
  const [status, setStatus] = useState<STATUS>(STATUS.DEFAULT)
  const [message, setMessage] = useState<string>()
  const [pag, setPag] = useState(0)

  const updateFeed = useCallback(
    async () => {
      setStatus(STATUS.LOADING)
      if (!ID) {
        // eslint-disable-next-line
        ID = localStorage.getItem("USER_ID") || "";
      }
      try {
        setStatuses(await StatusService.loadMoreFeed(pag, ID))
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
    },
    [],
  )
  useEffect(() => {
    updateFeed()
  }, [updateFeed, pag])

  // Check if the story has statuses
  if (statuses.length <= 0) {
    return <h3>Nothing to see here. Go post a status!</h3>
  }


  return (
    <div>
      {statuses.map((s, i) => <AStatus status={s} key={i} />)}
      <Button margin="1rem auto" onClick={() => setPag(pag + 1)}>{status === STATUS.LOADING ? "Loading..." : "See more"}</Button>
      {message && <h3>{message}</h3>}
    </div>
  )
}

export default FeedView
