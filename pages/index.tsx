import type { NextPage } from 'next'
import { Headline, Nav } from '../features/landing';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div>
      <Nav />
      <section className={styles.headline}>
        <Headline />
      </section>
    </div>
  )
}

export default Home
