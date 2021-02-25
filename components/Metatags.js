import Head from 'next/head';

export default function Metatags({
  title = 'Mastering The Dicipline Of Crypto Trading',
  description = 'A community focused on mastering The Dicipline of Crypto Trading',
  image = 'https://degenerate.co/degenlogo.png',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@degeneratedotco" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
