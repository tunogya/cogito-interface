import { StrictMode } from "react"
import ReactDOM from "react-dom"
import App from "./pages/App"
import { LanguageProvider } from "./i18n"
import { RecoilRoot } from "recoil"
import { HashRouter } from "react-router-dom"
import reportWebVitals from "./reportWebVitals"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./theme"

const Updaters = () => {
  return <></>
}

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <HashRouter>
        <LanguageProvider>
          <ChakraProvider theme={theme}>
            <Updaters />
            <App />
          </ChakraProvider>
        </LanguageProvider>
      </HashRouter>
    </RecoilRoot>
  </StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
