import { FirebaseError } from 'firebase/app';
import { createToast } from 'mosha-vue-toastify';

import { useGlobalStore } from '../stores/useGlobalStore';

type ErrorWithMessage = {
  message: string
}

function isErrorMessage(err: unknown): err is ErrorWithMessage {
  return typeof err === 'object' && err !== null && 'message' in err && typeof (err as Record<string, unknown>).message === 'string';
}

export const errorHandler = (err: unknown) => {
  const globalStore = useGlobalStore()
  globalStore.setLoading(false)
  if (
    err instanceof TypeError ||
    err instanceof RangeError ||
    err instanceof EvalError ||
    err instanceof Error ||
    err instanceof FirebaseError ||
    isErrorMessage(err)
  ) {
    createToast(err.message, {
      position: 'top-center',
      showIcon: true,
      hideProgressBar: true,
      type: 'danger',
      transition: 'slide',
    })
  }
  return Promise.reject(err)
}
