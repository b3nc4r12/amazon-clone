import { MoralisProvider } from "react-moralis"
import "../styles/globals.css"
import { CartProvider } from "../hooks/useCart"

const MyApp = ({ Component, pageProps }) => {
  return (
    <MoralisProvider
      appId={process.env.moralis_app_id}
      serverUrl={process.env.moralis_server_url}
    >
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </MoralisProvider>
  )
}

export default MyApp