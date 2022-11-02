import "../styles/globals.css";

import { SnackbarProvider } from "notistack";
import WalletConnectionProvider from "../components/WalletConnection/WalletConnectionProvider";

function MyApp({ Component, pageProps }) {
  return (
    <WalletConnectionProvider>
      <SnackbarProvider>
        <Component {...pageProps} />
      </SnackbarProvider>
    </WalletConnectionProvider>
  );
}

export default MyApp;
