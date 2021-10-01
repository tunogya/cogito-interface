import {extendTheme} from "@chakra-ui/react"
import {styles} from "./styles"
import {config} from "./config"
import {borders} from "./foundations/borders"
import {Button} from "./components/button";

const theme = extendTheme({
  config,
  styles,
  borders,
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "ChicagoFLFRegular"
      }
    },
    Button,
  },
})

export default theme
