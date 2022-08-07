import { doc, getDoc } from 'firebase/firestore';

import { firestore } from '../../../firebase';
import { errorHandler } from '../../../utils/errorHandler';
import { userConverter } from '../converters';

import type { Option } from '../../../utils/types';
export type User = {
  id: string,
  displayName: string | null,
  email: string | null,
  photoURL: string | null,
  phoneNumber: string | null,
  lastWorkspaceId: string | null,
  createdAt: Date,
  updatedAt: Date,
}

export const useUserService = () => {
  // Handlers
  async function getUserById(userId: Option<string>) {
    try {
      if (!userId) throw new Error('User id not found')

      const docRef = doc(firestore, "users", userId).withConverter(userConverter);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return null
      return docSnap.data();
    } catch (err) {
      return errorHandler(err)
    }
  }

  return {
    getUserById,
  }
}
