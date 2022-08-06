import { useForm } from "@evilkiwi/form"

export const useSignUpForm = () => {
  const formInstance = useForm<{
    email: string
    password: string
    confirmPassword: string
  }>({
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
    console.log(formValues)
  })
  const signInWithGoogle = async () => {
    console.log('signInWithGoogle')
  }

  return {
    formInstance,
    email,
    password,
    confirmPassword,

    onSubmit,
    signInWithGoogle,
  }
}