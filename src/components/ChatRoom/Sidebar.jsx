import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import UserInfor from './components/UserInfor'
import RoomList from './components/RoomList'
import styled from 'styled-components'

const SidebarStyled = styled.div`
  background-color: #3f0e40;
  color: white;
  height: 100vh;
  padding: 16px 18px;
`
Sidebar.propTypes = {}

function Sidebar(props) {
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}>
          <UserInfor />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </SidebarStyled>
  )
}

export default Sidebar
