import React, { useState, useEffect } from 'react'
import ProgressBar from '@ramonak/react-progress-bar'

let interval1
let interval2
const Progress = ({ isLoading }) => {
  const [completed, setCompleted] = useState(0)
  useEffect(() => {
    if (!isLoading && completed > 0) {
      clearInterval(interval1)
      clearInterval(interval2)
      interval1 = interval2 = undefined
      setCompleted(100)
    }
    if (isLoading) {
      if (!interval1) {
        setCompleted(0)
        interval1 = setInterval(() => {
          setCompleted(c => c + +Math.random().toString()[3])
        }, 500)
      } else if (completed > 80) {
        clearInterval(interval1)
        if (!interval2) {
          interval2 = setInterval(() => {
            setCompleted(c => c + 1)
          }, 1000)
        }
      } else {
        if (isLoading && completed === 99) {
          clearInterval(interval2)
        }
      }
    }
  }, [isLoading, completed])

  return (
    <ProgressBar
      transitionDuration="0.5s"
      baseBgColor="#F8F9F9"
      bgColor="#4d70eb"
      completed={completed}
    />
  )
}

export default React.memo(Progress)
