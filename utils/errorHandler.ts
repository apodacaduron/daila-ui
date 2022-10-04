import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

type ErrorWithMessage = {
  message: string
}

function isErrorMessage(err: unknown): err is ErrorWithMessage {
  return typeof err === 'object' && err !== null && 'message' in err && typeof (err as Record<string, unknown>).message === 'string';
}

export const errorHandler = (err: unknown) => {
  if (
    err instanceof TypeError ||
    err instanceof RangeError ||
    err instanceof EvalError ||
    err instanceof Error ||
    err instanceof FirebaseError ||
    isErrorMessage(err)
  ) {
    toast.error(err.message)
  } else {
    console.log(err)
  }
}