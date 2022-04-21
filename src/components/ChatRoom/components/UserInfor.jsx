import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { auth, db } from '../../../firebase/config'
import { AuthContext } from '../../Context/AuthProvider'
import { useNavigate } from 'react-router-dom'

UserInfor.propTypes = {}

const WapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  .wrap-info {
    overflow: hidden;
  }
  .user-name {
    text-transform: capitalize;
    margin-left: 5px;
  }
`

function UserInfor(props) {
  const navigate = useNavigate()
  const {
    authUser: { displayName, photoURL }
  } = useContext(AuthContext)

  const handleLogout = () => {
    auth.signOut()
    navigate('/login')
  }

  useEffect(() => {
    // tự động thực thi khi có thay đổi trên fire store
    db.collection('users').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        // doc.data()  --> chứa trường hiện tại trên db document firebase
        ...doc.data(),
        id: doc.id
      }))
    })
  }, [])

  return (
    <WapperStyled>
      <div className="wrap-info">
        <Avatar src={photoURL} size="default">
          {photoURL ? '' : displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <span className="user-name">{displayName}</span>
      </div>
      <Button ghost onClick={() => handleLogout()}>
        Đăng xuất
      </Button>
    </WapperStyled>
  )
}

export default UserInfor
