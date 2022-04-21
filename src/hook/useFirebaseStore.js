import { useEffect, useState } from 'react'
import { db } from '../firebase/config'

const useFirebaseStore = (collection, condition) => {
  const [documents, setDocuments] = useState([])
  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy('createdAt')
    // condition
    /*
      {
        fieldName: 'rooms',
        operator: 'array-contains'
        compareValue: 'uId'
        * Lấy ra rooms mà nó có uId === array-contains
      }
    */
    if (collection) {
      if (!condition.compareValue || !condition.compareValue.length) return
      // Gán lại collectionRef
      collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue)
    }
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setDocuments(documents)
    })
    return unsubscribe
  }, [collection, condition])
  return documents
}

export default useFirebaseStore
