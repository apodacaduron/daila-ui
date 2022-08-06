import { useForm } from '@evilkiwi/form';

import { useAuthService } from '../services/useAuthService';

type SignUpForm = {
  email: string
  password: string
  confirmPassword: string
}
type SignUpFormContext = {
  handlers?: {
    onSignUpWithGoogle?(): void
    onSubmitSignUpForm?(): void
  }
}
export const useSignUpForm = (context: SignUpFormContext) => {
  const authService = useAuthService()

  const formInstance = useForm<SignUpForm>({
    defaults: {},
  })
  const email = formInstance.useField('email', {
    type: 'email',
    required: true,
  })
  const password = formInstance.useField('password', {
    required: true,
  })
  const confirmPassword = formInstance.useField('confirmPassword', {
    required: true,
    min: 6,
    validator: (_: unknown, value: unknown) => value === password.value,
    message: 'Password does not match',
  })

  const onSubmit = formInstance.handle(async (formValues) => {
    await authService.signUpWithCredentials(formValues.email, formValues.password)
    context.handlers?.onSubmitSignUpForm?.()
  })

  return {
    formInstance,
    email,
    password,
    confirmPassword,

    onSubmit,
    signUpWithGoogle: async () => {
      await authService.signInWithGoogle()
      context.handlers?.onSignUpWithGoogle?.()
    },
  }
}