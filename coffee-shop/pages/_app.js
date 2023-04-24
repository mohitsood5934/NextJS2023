import { createContext, useReducer } from "react";
import "@/styles/globals.css";
import StoreProvider from "../store/store-context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
      {/* <footer>
        <p>Mohit @20203</p>
      </footer> */}
    </>
  );
}
