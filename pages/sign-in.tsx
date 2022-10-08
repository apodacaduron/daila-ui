import type { NextPage } from 'next'
import Link from 'next/link';
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
import Image from 'next/image';

const SignIn: NextPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  })

  const authHook = useAuthentication()
  const usersHook = useUsers()
  const teamsHook = useTeams()

  const isLoading = authHook.signInWithGoogle.loading || usersHook.createUserAccount.loading || teamsHook.createTeam.loading

  async function logInWithGoogle() {
    await authHook.signInWithGoogle.execute()
    await usersHook.createUserAccount.execute()
    await teamsHook.createTeam.execute()
  }

  return (
    <ForVisitorsRouteGuard isLoading={isLoading}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link href={routes.HOME}>
              <a>
                <Image src="/assets/daila.svg" alt="Daila logo" width="100px" height="56px" />
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
