import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'
import { Col, Row } from 'antd'

ChatRoom.propTypes = {}

function ChatRoom(props) {
  return (
    <Row>
      <Col span={6}>
        <Sidebar />
      </Col>
      <Col span={18}>
        <ChatWindow />
      </Col>
    </Row>
  )
}

export default ChatRoom
