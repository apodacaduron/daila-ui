import type { NextPage } from 'next'
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

import { Anchor, Button, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

import styles from '../styles/Authentication.module.scss';

const SignUp: NextPage = () => {
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
          <Title>Crear una cuenta</Title>
          <Text color="dimmed">Comienza tu periodo de prueba de 30 dias</Text>
        </div>
        <div className={styles.form}>
          <TextInput placeholder="Escribe tu nombre" label="Nombre" />
          <TextInput
            type="email"
            placeholder="Escribe tu correo"
            label="Correo"
          />
          <TextInput
            type="password"
            placeholder="••••••••"
            label="Crea una contraseña"
          />
        </div>
        <div className={styles.actions}>
          <Button>Comenzar ahora</Button>
          <Button variant="default" leftIcon={<FcGoogle size="1.5rem" />}>
            Registrate con Google
          </Button>
        </div>
        <div className={styles['helpers-2']}>
          <Text color="dimmed">
            Ya tienes una cuenta?{' '}
            <Link href="/sign-in" passHref>
              <Anchor component="a">Inicia sesion</Anchor>
            </Link>
          </Text>
        </div>
      </div>
    </div>
  )
}

export default SignUp