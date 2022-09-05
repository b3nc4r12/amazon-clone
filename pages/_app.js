import "../styles/globals.css"
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "../app/store"
import { Toaster } from "react-hot-toast"

const App = ({ Component, pageProps }) => {
    return (
        <ReduxProvider store={store}>
            <ThirdwebProvider desiredChainId={ChainId.Goerli}>
                <Toaster />
                <Component {...pageProps} />
            </ThirdwebProvider>
        </ReduxProvider>
    )
}

export default App