import { useHttpsCallable } from 'react-firebase-hooks/functions'

import { functions } from '../../../lib/firebase'

export function useUsers() {
  const createUserAccount = useHttpsCallable(functions, 'createUserAccountCF')

  return {
    createUserAccount: {
      execute: createUserAccount[0],
      loading: createUserAccount[1],
      error: createUserAccount[2],
    },
  }
}
