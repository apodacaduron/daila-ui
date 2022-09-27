import type { NextPage } from 'next'
import { useForm } from '@mantine/form';

const SignIn: NextPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  })

  return <div>Sign in</div>
}

export default SignIn
