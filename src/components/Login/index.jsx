import { Button, Col, Row, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'
import firebase, { auth } from '../../firebase/config'
import { generateKeywords, addDocument } from '../../firebase/services'
const { Title } = Typography

Login.propTypes = {}

const RowStyled = styled(Row)`
  .login__title {
    text-align: center;
  }
  Button {
    width: 100%;
  }
  Button:last-child {
    margin-top: 10px;
  }
`

const fbProvider = new firebase.auth.FacebookAuthProvider()
const googleProvider = new firebase.auth.GoogleAuthProvider()

function Login(props) {
  const handleFbLogin = async (provider) => {
    // connect login FB,GG và add dự liệu
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider)
    if (additionalUserInfo?.isNewUser) {
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: user.providerId,
        keywords: generateKeywords(user.displayName?.toLowerCase())
      })
    }
  }

  return (
    <RowStyled justify="center">
      <Col span={8}>
        <Title level={3} className="login__title">
          Fun Chat
        </Title>
        <Button
          onClick={() => {
            handleFbLogin(googleProvider)
          }}
        >
          Đăng nhập bằng Google
        </Button>
        <Button
          onClick={() => {
            handleFbLogin(fbProvider)
          }}
        >
          Đăng nhập bằng Facebook
        </Button>
      </Col>
    </RowStyled>
  )
}

export default Login
