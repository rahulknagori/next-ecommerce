import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "../store";
import { Suspense } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar></Navbar>
      <Suspense fallback={<p>Loading feed...</p>}>
        <Component {...pageProps} />
      </Suspense>
    </Provider>
  );
}
