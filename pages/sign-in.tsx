import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

import { Anchor, Button, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

import { routes } from '../data/routesMap';
import { useAuthentication } from '../features/authentication';
import { ForVisitorsRouteGuard } from '../features/authentication/route-guards';
import { useTeams } from '../features/teams';
import { useUsers } from '../features/users';
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

  const authHook = useAuthentication()
  const usersHook = useUsers()
  const teamsHook = useTeams()

  // React.useEffect(() => {
  //   if (!authHook.authState.loading && !triedSignIn) {
  //     if (authHook.authState.user) {
  //       router.push(routes.TEAM_DASHBOARD('123')) // go to default protected page
  //     }
  //   }
  // }, [router, authHook.authState.user, authHook.authState.loading, triedSignIn])

  const isLoading = authHook.signInWithGoogle.loading

  async function logInWithGoogle() {
    setTriedSignIn(true)
    await authHook.signInWithGoogle.execute()
    await usersHook.createUserAccount.execute()
    const response = await teamsHook.createTeam.execute()
    const teamId = response?.data as string | undefined

    if (authHook.signInWithGoogle.error) {
      return toast.error(authHook.signInWithGoogle.error.message)
    }

    redirectToWorkspace(teamId)
  }

  function redirectToWorkspace(teamId: string | undefined) {
    if (authHook.authState.user && teamId) {
      toast.success('Signed in')
      router.push(routes.TEAM_DASHBOARD(teamId))
    }
  }

  if (authHook.authState.loading) {
    return <h1>App initializing</h1>
  }

  return (
    <ForVisitorsRouteGuard>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link href={routes.HOME}>
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
            <Link href={routes.FORGOT_PASSWORD} passHref>
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
              <Link href={routes.SIGN_UP} passHref>
                <Anchor component="a">Registrate</Anchor>
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </ForVisitorsRouteGuard>
  )
}

export default SignIn
