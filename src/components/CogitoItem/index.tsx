import {FC} from "react"
import {Stack, Button} from "@chakra-ui/react"

interface Props {
  id: number
}

const CogitoItem: FC<Props> = (props) => {
  return (
    <Stack spacing={0}>
      <Button size={"sm"} variant={"outline"}>#{props.id}</Button>
    </Stack>
  )
}

export default CogitoItem