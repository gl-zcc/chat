import Head from 'next/head'

export default function Header() {
  return (
    <Head>
      <title>Chat</title>
      <meta name="description" content="Chat" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}