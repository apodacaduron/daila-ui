import { useHttpsCallable } from 'react-firebase-hooks/functions'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'

import { firestore, functions } from '../../../lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { userConverter } from '../converters'

export function useUsers() {
  const createUserAccount = useHttpsCallable(functions, 'createUserAccountCF')
  // const t = useDocumentDataOnce()
  
  async function getCurrentUser(id: string) {
    const userRef = doc(firestore, "users", id).withConverter(userConverter)
    const userSnapshot = await getDoc(userRef)

    if (userSnapshot.exists()) {
      return userSnapshot.data()
    }
  }

  return {
    createUserAccount: {
      execute: createUserAccount[0],
      loading: createUserAccount[1],
      error: createUserAccount[2],
    },
    getCurrentUser,
  }
}
