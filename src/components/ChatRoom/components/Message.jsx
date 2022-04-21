import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import styled from 'styled-components'
import { formatRelative } from 'date-fns'

Message.propTypes = {
  message: PropTypes.object
}

const MessageStyled = styled.div`
  margin-top: 20px;
  .message__info {
    display: flex;
    p {
      margin: 0 0 0 10px;
      font-weight: bold;
      text-transform: capitalize;
      align-self: center;
      small {
        opacity: 0.5;
        margin-left: 10px;
      }
    }
  }
  .message__content {
    margin: 3px 0 0 30px;
  }
`

function Message({ message }) {
  function formatDate(seconds) {
    let formattedDate = ''
    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date())
      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    }
    return formattedDate
  }
  return (
    <MessageStyled>
      <div className="message__info">
        <Avatar src={message.photoURL} size="default">
          {message.photoURL ? '' : message.displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <p>
          {message.displayName} <small>{formatDate(message.createdAt?.seconds)}</small>
        </p>
      </div>
      <p className="message__content">{message.text}</p>
    </MessageStyled>
  )
}

export default Message
