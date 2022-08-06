import { useForm } from '@evilkiwi/form';

import { useAuthService } from '../services/useAuthService';

type SignInForm = {
  email: string
  password: string
}
type SignInFormContext = {
  handlers?: {
    onSignInWithGoogle?(): void
    onSubmitSignInForm?(): void
  }
}
export const useSignInForm = (context: SignInFormContext) => {
  const authService = useAuthService()

  const formInstance = useForm<SignInForm>({
    defaults: {},
  })
  const email = formInstance.useField('email', {
    type: 'email',
    required: true,
  })
  const password = formInstance.useField('password', {
    required: true,
  })

  const onSubmit = formInstance.handle(async (formValues) => {
    await authService.signInWithCredentials(formValues.email, formValues.password)
    context.handlers?.onSubmitSignInForm?.()
  })

  return {
    formInstance,
    email,
    password,

    onSubmit,
    signInWithGoogle: async () => {
      await authService.signInWithGoogle()
      context.handlers?.onSignInWithGoogle?.()
    },
  }
}