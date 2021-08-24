import React from 'react'

const CalendarEvent = ({ event }) => {
  const { user, title } = event
  return (
    <div>
      <strong>{title}</strong>
      <br />
      <span>{user.name}</span>
    </div>
  )
}

export default CalendarEvent
