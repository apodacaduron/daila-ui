import { collection, getDocs, query } from 'firebase/firestore';

import { firestore } from '../../../firebase';
import { errorHandler } from '../../../utils/errorHandler';
import { workspaceConverter } from '../converters';

import type { Option } from '../../../utils/types';

export const workspaceCategories = ['personal-space', 'psychologist', 'admin'] as const
export type WorkspaceCategory = typeof workspaceCategories[number]

export type Workspace = {
  id: string
  name: string,
  description: string | null,
  category: WorkspaceCategory,
  createdById: string,
  logoURL: string | null,
  createdAt: Date,
  updatedAt: Date
}

export type WorkspacesMap = {
  [workspaceId: string]: Workspace
}

export const useWorkspaceService = () => {
  // Handlers
  async function getWorkspacesByUserId(userId: Option<string>) {
    try {
      if (!userId) throw new Error('User id not found')

      const workspaces: WorkspacesMap = {}
      const q = query(collection(firestore, `users/${userId}/workspaces`)).withConverter(workspaceConverter)
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((snapshot) => {
        if (snapshot.exists()) {
          workspaces[snapshot.data().id] = snapshot.data()
        }
      })
      return workspaces
    } catch (err) {
      return errorHandler(err)
    }
  }

  return {
    getWorkspacesByUserId
  }
}