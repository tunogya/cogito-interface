import { extendTheme } from "@chakra-ui/react"
import { styles } from "./styles"
import { config } from "./config"
import { borders } from "./foundations/borders"

const theme = extendTheme({
  config,
  styles,
  borders,
  components: {},
})

export default theme
