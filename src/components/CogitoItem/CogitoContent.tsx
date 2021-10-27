import {FC, Key} from "react";
import useCogitoTokenURI from "../../hooks/useCogitoTokenURI";
import {AspectRatio, Stack, Text, Image, Link, Button, Tooltip} from "@chakra-ui/react";
import {parseDate} from "../../utils/parseDate";
import parseUriToHttp from "../../utils/parseUriToHttp";
import shortenCid from "../../utils/shortenCid";

interface Props {
  address: string | null
  id: number
}

const CogitoContent: FC<Props> = props => {
  const cogito = useCogitoTokenURI(props.address, props.id)

  return (
    <Stack>
      <Text>{cogito.cogito.text}</Text>
      <Stack direction={"row"}>
      {cogito.cogito?.attachment?.media.map((media: any, index: Key) => (
        <>
          {media?.uri && (
            <Button key={index} as={Link} href={parseUriToHttp(media.uri)[0]} isExternal size={"sm"}>
              <Tooltip label={media?.name} borderRadius={"xl"}>
                <Text>{shortenCid(media?.name, 10)}</Text>
              </Tooltip>
            </Button>
          )}
        </>
      ))}
      </Stack>
      <Text fontSize={"xs"} color={"gray"}>{parseDate(cogito.cogito.create_at)}</Text>
    </Stack>
  )
}

export default CogitoContent