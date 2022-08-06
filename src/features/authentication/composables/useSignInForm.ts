import { useForm } from '@evilkiwi/form';

import { useAuthService } from '../services/useAuthService';

type SignInForm = {
  email: string
  password: string
}
export const useSignInForm = () => {
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
    authService.signInWithCredentials(formValues.email, formValues.password)
  })

  return {
    formInstance,
    email,
    password,

    onSubmit,
    signInWithGoogle: authService.signInWithGoogle,
  }
}