import Head from 'next/head'
import styles from '../styles/Home.module.css'

function getUser() {
  fetch('api/user').then(data=>data.json()).then(json=>console.log(json))
}

getUser();

export default function Home() {


  return (
    <div className={styles.container}>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="./about">about!</a>
        </h1>

      </main>
    </div>
  )
}
