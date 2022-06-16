import { createToast } from 'mosha-vue-toastify'

export const errorHandler = (err: unknown) => {
  if (
    err instanceof TypeError ||
    err instanceof RangeError ||
    err instanceof EvalError ||
    err instanceof Error
  ) {
    createToast(err.message, {
      position: 'top-center',
      showIcon: true,
      hideProgressBar: true,
      type: 'danger',
      transition: 'slide',
    })
  } else {
    console.log(err)
  }
}
