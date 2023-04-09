import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <footer>
        <p>Mohit @20203</p>
      </footer>
    </>
  );
}
