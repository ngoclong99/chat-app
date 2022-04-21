import { PlusSquareOutlined } from '@ant-design/icons'
import { Button, Collapse } from 'antd'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../Context/AppProvider'

RoomList.propTypes = {}
const PanelStyled = styled(Collapse.Panel)`
  /* &&& ghi đè lên */
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding-left: 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
    .link-room {
      cursor: pointer;
      color: rgb(146, 192, 239);
      text-transform: capitalize;
      font-size: 16px;
    }
  }
`

function RoomList(props) {
  const { setIsAddRoomVisible } = useContext(AppContext)
  const { rooms, setSelectedRoom } = useContext(AppContext)

  const handleAddRoom = () => {
    setIsAddRoomVisible(true)
  }
  return (
    <Collapse defaultActiveKey={['1']} ghost={true}>
      <PanelStyled header="Danh sách phòng" key="1">
        {rooms.map((room) => (
          <p className="link-room" key={room.id} onClick={() => setSelectedRoom(room)}>
            {room.name}
          </p>
        ))}
        <Button
          type="text"
          icon={<PlusSquareOutlined />}
          className="add-room"
          onClick={handleAddRoom}
        >
          Thêm phòng
        </Button>
      </PanelStyled>
    </Collapse>
  )
}

export default RoomList
