import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

import { Anchor, Button, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

import { auth } from '../lib/firebase';
import styles from '../styles/Authentication.module.scss';

const SignIn: NextPage = () => {
  const router = useRouter()
  const [triedSignIn, setTriedSignIn] = React.useState(false)
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  })

  const [authUser, loadingAuth] = useAuthState(auth)

  React.useEffect(() => {
    if (!loadingAuth && !triedSignIn) {
      if (authUser) {
        router.push('/123/dashboard') // go to default protected page
      }
    }
  }, [router, loadingAuth, authUser, triedSignIn])

  const [
    signInWithGoogle,
    userCredential,
    loading,
    errorSignInWithGoogle,
  ] = useSignInWithGoogle(auth)

  const isLoading = loading

  async function logInWithGoogle() {
    setTriedSignIn(true)
    await signInWithGoogle()
  }

  if (errorSignInWithGoogle) {
    toast.error(errorSignInWithGoogle.message)
  }
  if (loadingAuth) {
    return <h1>App initializing</h1>
  }
  if (userCredential) {
    return (
      <div>
        <p>Signed In User: {userCredential.user.email}</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <img src="/assets/daila.svg" />
            </a>
          </Link>
        </div>
        <div className={styles.title}>
          <Title>Inicia sesión en tu cuenta</Title>
          <Text color="dimmed">
            Bienvenido de vuelta, porfavor utiliza tus credenciales
          </Text>
        </div>
        <div className={styles.form}>
          <TextInput
            {...form.getInputProps('email')}
            type="email"
            placeholder="Escribe tu correo"
            label="Correo"
            disabled={isLoading}
          />
          <TextInput
            {...form.getInputProps('password')}
            type="password"
            placeholder="••••••••"
            label="Contraseña"
            disabled={isLoading}
          />
        </div>
        <div className={styles.helpers}>
          <Link href="/forgot-password" passHref>
            <Anchor component="a">Olvidaste tu contraseña?</Anchor>
          </Link>
        </div>
        <div className={styles.actions}>
          <Button disabled={isLoading}>Iniciar sesión</Button>
          <Button
            variant="default"
            leftIcon={<FcGoogle size="1.5em" />}
            disabled={isLoading}
            onClick={logInWithGoogle}
          >
            Inicia sesión con Google
          </Button>
        </div>
        <div className={styles['helpers-2']}>
          <Text color="dimmed">
            Aun no tienes una cuenta?{' '}
            <Link href="/sign-up" passHref>
              <Anchor component="a">Registrate</Anchor>
            </Link>
          </Text>
        </div>
      </div>
    </div>
  )
}

export default SignIn
