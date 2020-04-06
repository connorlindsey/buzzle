import React, { useState, useEffect } from 'react'
import AStatus from './AStatus'
import Button from "../style/Button"
import StatusService from '../../services/StatusService'
import Status from '../../model/Status'

interface FeedProps {
  alias?: string | null
}

enum STATUS {
  DEFAULT,
  LOADING,
  ERROR
}

// Component which renders a list of statuses
const FeedView: React.FC<FeedProps> = ({ alias }) => {
  const [statuses, setStatuses] = useState<Status[]>([])
  const [status, setStatus] = useState<STATUS>(STATUS.DEFAULT)
  const [message, setMessage] = useState<string>()
  const [key, setKey] = useState("nada")


  // Load intial feed
  useEffect(() => {
    async function getFeed() {
      setStatuses([])
      setStatus(STATUS.LOADING)

      // Get user alias if this is the home screen
      // eslint-disable-next-line
      if (!alias) alias = localStorage.getItem("USER_ALIAS") || "";

      try {
        console.log("Get initial feed")
        const { statuses: newStatuses, key: newKey } = await StatusService.loadMoreFeed("nada", alias)
        console.log('Statuses', newStatuses)
        console.log(key)
        setStatuses(newStatuses)
        setKey(newKey);
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
    }
    getFeed()
  }, [])

  const loadMore = async () => {
    setStatus(STATUS.LOADING)

    // Get user alias if this is the home screen
    // eslint-disable-next-line
    if (!alias) alias = localStorage.getItem("USER_ALIAS") || "";

    try {
      console.log("Get initial feed")
      const { statuses: newStatuses, key: newKey } = await StatusService.loadMoreFeed(key, alias)
      setStatuses([...statuses, ...newStatuses])
      setKey(newKey);
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
  }

  if (status === STATUS.LOADING && statuses.length <= 0) {
    return (<div><h3>Loading...</h3></div>)
  }

  // Check if the story has statuses
  if (statuses.length <= 0) {
    return <h3>Nothing to see here. Go post a status!</h3>
  }


  return (
    <div>
      {statuses.map((s, i) => <AStatus status={s} key={i} />)}
      <Button margin="1rem auto" onClick={loadMore} disabled={status === STATUS.LOADING || key === "noMas"}>{status === STATUS.LOADING ? "Loading..." : "See more"}</Button>
      {message && <h3>{message}</h3>}
    </div>
  )
}

export default FeedView
