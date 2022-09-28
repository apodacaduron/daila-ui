import styles from '../styles/Headline.module.scss';

const Headline = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>
        Enfocados en la <br />
        <span>Salud Mental</span>
      </h1>
      <p className={styles.subtitle}>
        Todo lo que necesitas para administrar a tus pacientes en un solo lugar
      </p>
      <img src="/assets/brain_bg.svg" className={styles['brain-bg']} />
    </div>
  )
}

export default Headline
