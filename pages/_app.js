import "../styles/style.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
