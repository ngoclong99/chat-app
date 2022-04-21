import { Alert } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from './../Context/AppProvider'
import ChatContent from './components/ChatContent'
import ChatHeader from './components/ChatHeader'

ChatWindow.propTypes = {}

function ChatWindow(props) {
  const { selectedRoom } = useContext(AppContext)
  return (
    <>
      {selectedRoom.id ? (
        <>
          <ChatHeader />
          <ChatContent />
        </>
      ) : (
        <Alert message="Vui lòng chọn phòng!" type="info" showIcon />
      )}
    </>
  )
}

export default ChatWindow
