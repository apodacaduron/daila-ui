import Link from 'next/link';

import { Button } from '@mantine/core';

import styles from '../styles/Nav.module.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/assets/daila.svg" />
        </div>
        <div className={styles.actions}>
          <Link href="/sign-in">
            <Button component="a">Inicia sesión</Button>
          </Link>
          <Link href="/sign-up">
            <Button component="a" variant="default">
              Regístrate
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav
