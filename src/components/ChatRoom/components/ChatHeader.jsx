import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Popover, Tooltip } from 'antd'
import { UserAddOutlined, UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { AppContext } from './../../Context/AppProvider'
ChatHeader.propTypes = {}

const HeaderStyles = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  max-height: 60px;
  padding: 0 18px;
  justify-content: space-between;
  .header__info p {
    margin: 0;
    &.header__title {
      font-weight: bold;
      font-size: 16px;
    }
    &.header__description {
    }
  }
`
const GroupAvatarStyles = styled.div`
  display: flex;
  align-items: center;
`

function ChatHeader(props) {
  const { selectedRoom, members, setIsAddMemberVisible } = React.useContext(AppContext)
  console.log(members)
  return (
    <HeaderStyles>
      <div className="header__info">
        <p className="header__title">{selectedRoom.name}</p>
        <p className="header__description">{selectedRoom.description}</p>
      </div>
      <GroupAvatarStyles>
        <Button
          type="text"
          icon={<UserAddOutlined />}
          className="add-room"
          onClick={() => setIsAddMemberVisible(true)}
        >
          Mời
        </Button>
        <Avatar.Group maxCount={2}>
          {members.map((member) => (
            <Popover
              key={member.id}
              placement="bottomRight"
              content={member.displayName}
              trigger="click"
            >
              <Avatar src={member?.photoURL} size="default">
                {member.photoURL ? '' : member.displayName.charAt(0).toUpperCase()}
              </Avatar>
            </Popover>
          ))}
        </Avatar.Group>
      </GroupAvatarStyles>
    </HeaderStyles>
  )
}

export default ChatHeader
