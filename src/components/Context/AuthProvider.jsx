/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFirebaseAuth from '../../hook/useFirebaseAuth'
import imgLoadding from './../../assets/Image/loadding-page.gif'

AuthProvider.propTypes = {}

export const AuthContext = createContext()

function AuthProvider(props) {
  const { authUser, isLoading } = useFirebaseAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (authUser) navigate('/chat-room')
    else navigate('/login')
  }, [authUser])

  return (
    <AuthContext.Provider value={{ authUser }}>
      {isLoading ? <img src={imgLoadding} alt="loadding" className="d-block m-auto" /> : props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
