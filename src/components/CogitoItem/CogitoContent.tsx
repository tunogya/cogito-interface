import {FC, Key} from "react";
import useCogitoTokenURI from "../../hooks/useCogitoTokenURI";
import {Stack, Text} from "@chakra-ui/react";
import {parseDate} from "../../utils/parseDate";

interface Props {
  address: string | null
  id: number
}

const CogitoContent: FC<Props> = props => {
  const cogito = useCogitoTokenURI(props.address, props.id)

  return (
    <Stack>
      <Text>{cogito.cogito.text}</Text>
      { cogito.cogito?.attachment?.media.map((media: any, index: Key)=> (
        <Stack key={index}>
          <Text>{media?.name}</Text>
          <Text>{media?.uri}</Text>
        </Stack>
      )) }
      <Text fontSize={"xs"} color={"gray"}>{parseDate(cogito.cogito.create_at)}</Text>
    </Stack>
  )
}

export default CogitoContent