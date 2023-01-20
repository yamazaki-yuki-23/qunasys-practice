import Head from 'next/head';

export default function Header() {
  return (
    <Head>
      <title>chart-js-app</title>
      <meta name='description' content='Chart.jsで散布図を表示するアプリ' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}
