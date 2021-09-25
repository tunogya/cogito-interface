import { Button, Stack } from "@chakra-ui/react"
import {useActiveLocale} from "../../hooks/useActiveLocale";

const Cogito = () => {
  const {toggle} = useActiveLocale()
  return (
    <Stack>
      <Button onClick={toggle}>Change language</Button>
    </Stack>
  )
}

export default Cogito
