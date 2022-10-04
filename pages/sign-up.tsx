import type { NextPage } from 'next'
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

import { Anchor, Button, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

import { routes } from '../data/routesMap';
import { ForVisitorsRouteGuard } from '../features/authentication/route-guards';
import styles from '../styles/Authentication.module.scss';
import Image from 'next/image';
import { useAuthentication } from '../features/authentication';
import { useUsers } from '../features/users';
import { useTeams } from '../features/teams';
import { errorHandler } from '../utils/errorHandler';

const SignUp: NextPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  })

  const authHook = useAuthentication()
  const usersHook = useUsers()
  const teamsHook = useTeams()

  const isLoading = authHook.signInWithGoogle.loading

  async function logInWithGoogle() {
    try {
      await authHook.signInWithGoogle.execute()
      await usersHook.createUserAccount.execute()
      await teamsHook.createTeam.execute()
    } catch (err) {
      errorHandler(err)
    }
  }

  return (
    <ForVisitorsRouteGuard>
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
            <Title>Crear una cuenta</Title>
            <Text color="dimmed">Comienza tu periodo de prueba de 30 dias</Text>
          </div>
          <div className={styles.form}>
            <TextInput placeholder="Escribe tu nombre" label="Nombre" />
            <TextInput
              type="email"
              placeholder="Escribe tu correo"
              label="Correo"
              disabled={isLoading}
            />
            <TextInput
              type="password"
              placeholder="••••••••"
              label="Crea una contraseña"
              disabled={isLoading}
            />
          </div>
          <div className={styles.actions}>
            <Button disabled={isLoading}>Comenzar ahora</Button>
            <Button disabled={isLoading} onClick={logInWithGoogle} variant="default" leftIcon={<FcGoogle size="1.5em" />}>
              Registrate con Google
            </Button>
          </div>
          <div className={styles['helpers-2']}>
            <Text color="dimmed">
              Ya tienes una cuenta?{' '}
              <Link href={routes.SIGN_IN} passHref>
                <Anchor component="a">Inicia sesion</Anchor>
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </ForVisitorsRouteGuard>
  )
}

export default SignUp
