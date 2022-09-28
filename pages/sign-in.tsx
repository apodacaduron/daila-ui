import type { NextPage } from 'next'
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

import { Anchor, Button, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

import styles from '../styles/Authentication.module.scss';

const SignIn: NextPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  })

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
            type="email"
            placeholder="Escribe tu correo"
            label="Correo"
          />
          <TextInput
            type="password"
            placeholder="••••••••"
            label="Contraseña"
          />
        </div>
        <div className={styles.helpers}>
          <Link href="/forgot-password" passHref>
            <Anchor component="a">Olvidaste tu contraseña?</Anchor>
          </Link>
        </div>
        <div className={styles.actions}>
          <Button>Iniciar sesión</Button>
          <Button variant="default" leftIcon={<FcGoogle size="1.5rem" />}>
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
