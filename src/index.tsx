import "./constants/config"
import { StrictMode } from "react"
import ReactDOM from "react-dom"
import App from "./pages/App"
import { RecoilRoot } from "recoil"
import { HashRouter } from "react-router-dom"
import reportWebVitals from "./reportWebVitals"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./theme"
import { LanguageProvider } from "./i18n"
// @ts-ignore
import Chicago from "./assets/font/ChicagoFLF.ttf";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'ChicagoFLFRegular';
    src: url(${Chicago}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

const Updaters = () => {
  return <></>
}

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <HashRouter>
        <ChakraProvider theme={theme}>
          <LanguageProvider>
            <Updaters />
            <GlobalStyle/>
            <App />
          </LanguageProvider>
        </ChakraProvider>
      </HashRouter>
    </RecoilRoot>
  </StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
