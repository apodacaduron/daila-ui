import { useForm } from "@evilkiwi/form"

export const useSignInForm = () => {
  const formInstance = useForm<{
    email: string
    password: string
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

    onSubmit,
    signInWithGoogle,
  }
}