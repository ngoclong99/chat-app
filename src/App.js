/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from 'react-router-dom'
import ChatRoom from './components/ChatRoom/index'
import AppProvider from './components/Context/AppProvider'
import AuthProvider from './components/Context/AuthProvider'
import Login from './components/Login'
import AddMemberModal from './components/Modals/AddMemberModal'
import AddRoomModal from './components/Modals/AddRoomModal'

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chat-room" element={<ChatRoom />} />
        </Routes>
        <AddRoomModal />
        <AddMemberModal />
      </AppProvider>
    </AuthProvider>
  )
}

export default App
