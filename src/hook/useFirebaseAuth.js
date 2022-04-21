import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'

const useFirebaseAuth = (firebase) => {
  const [authUser, setAuthUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged((authUser) => {
      authUser ? setAuthUser(authUser) : setAuthUser(null)
    })
    setIsLoading(false)
    return () => {
      unlisten()
      setIsLoading(false)
    }
  }, [])

  return { authUser, isLoading }
}

export default useFirebaseAuth
