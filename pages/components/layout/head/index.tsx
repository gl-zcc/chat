import Head from 'next/head'

type Props = {
  title: string
}

export default function Header(props: Props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content="Chat" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}