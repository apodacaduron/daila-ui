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
          <Button>Inicia sesion</Button>
          <Button variant="default">Registrate</Button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
