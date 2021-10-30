import {FC, Key} from "react";
import useCogitoTokenURI from "../../hooks/useCogitoTokenURI";
import {Badge, Link, Stack, Text, Tooltip, useColorMode} from "@chakra-ui/react";
import {parseDate} from "../../utils/parseDate";
import parseUriToHttp from "../../utils/parseUriToHttp";
import shortenCid from "../../utils/shortenCid";
import {AttachmentIcon} from "@chakra-ui/icons";

interface CogitoContentProps {
  address: string | null
  id: number
}

const CogitoContent: FC<CogitoContentProps> = props => {
  const {uri, cogito} = useCogitoTokenURI(props.address, props.id)
  const {colorMode} = useColorMode()

  return (
    <Stack>
      <Text>{cogito.text}</Text>
      <Stack direction={"row"}>
        {cogito.attachment?.map((name: string, index: Key) => {
          return (
            <Stack as={Badge} key={index} direction={"row"} alignItems={"center"} colorScheme={"purple"}>
              <AttachmentIcon/>
              <Tooltip label={name} borderRadius={"xl"} bg={colorMode === "light" ? "black" : "white"}>
                <Link href={parseUriToHttp(uri)[0] + name} isExternal>
                  <Text>{name.length > 20 ? shortenCid(name, 10) : name}</Text>
                </Link>
              </Tooltip>
            </Stack>
          )
        })}
      </Stack>
      <Text fontSize={"xs"} color={"gray"}>{parseDate(cogito.create_at)}</Text>
    </Stack>
  )
}

export default CogitoContent