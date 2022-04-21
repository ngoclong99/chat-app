import React, { createContext, useContext, useMemo } from 'react'
import useFirebaseStore from './../../hook/useFirebaseStore'
import { AuthContext } from './AuthProvider'
import { useState } from 'react'

AppProvider.propTypes = {}

export const AppContext = createContext()

function AppProvider(props) {
  const uid = useContext(AuthContext).authUser?.uid
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
  const [isAddMemberVisible, setIsAddMemberVisible] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState({})

  const roomsCondition = useMemo(
    () => ({
      fieldName: 'members',
      // array-contains  ---> ở đây là 1 mảng chứa những uid
      operator: 'array-contains',
      compareValue: uid
    }),
    [uid]
  )

  const userCondition = useMemo(
    () => ({
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members
    }),
    [selectedRoom.members]
  )

  const members = useFirebaseStore('users', userCondition)

  // Trả về những room chứa field members theo uid
  const rooms = useFirebaseStore('rooms', roomsCondition)
  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        selectedRoom,
        members,
        isAddMemberVisible,
        setIsAddMemberVisible,
        setSelectedRoom,
        setIsAddRoomVisible
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider
