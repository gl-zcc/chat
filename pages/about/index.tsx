import styles from '../../styles/Home.module.css'

export default function About() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to about
          <a href= "./"> back to index </a>
        </h1>
      </main>
    </div>
  )
}
