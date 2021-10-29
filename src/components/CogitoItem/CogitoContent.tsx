import {FC, Key} from "react";
import useCogitoTokenURI from "../../hooks/useCogitoTokenURI";
import {Stack, Text, Link, Tooltip, Badge, useColorMode} from "@chakra-ui/react";
import {parseDate} from "../../utils/parseDate";
import parseUriToHttp from "../../utils/parseUriToHttp";
import shortenCid from "../../utils/shortenCid";
import {AttachmentIcon} from "@chakra-ui/icons";
import {FaPhotoVideo} from "react-icons/all";

interface CogitoContentProps {
  address: string | null
  id: number
}

const CogitoContent: FC<CogitoContentProps> = props => {
  const cogito = useCogitoTokenURI(props.address, props.id)
  const {colorMode} = useColorMode()

  return (
    <Stack>
      <Text>{cogito.cogito.text}</Text>
      <Stack direction={"row"}>
        {cogito.cogito?.attachment?.media?.map((media: any, index: Key) => {
          if (!media.uri) {
            return null
          }
          return (
            <Stack as={Badge} key={index} direction={"row"} alignItems={"center"} colorScheme={"purple"}>
              <FaPhotoVideo/>
              <Tooltip label={media?.name} borderRadius={"xl"} bg={colorMode === "light" ? "black" : "white"}>
                <Link href={parseUriToHttp(media.uri)[0]} isExternal>
                  <Text>{media?.name.length > 20 ? shortenCid(media?.name, 10) : media.name}</Text>
                </Link>
              </Tooltip>
            </Stack>
          )
        })}

        {cogito.cogito?.attachment?.files?.map((file: any, index: Key) => {
          if (!file.uri) {
            return null
          }
          return (
            <Stack as={Badge} key={index} direction={"row"} alignItems={"center"}>
              <AttachmentIcon/>
              <Tooltip label={file?.name} borderRadius={"xl"} bg={colorMode === "light" ? "black" : "white"}>
                <Link href={parseUriToHttp(file.uri)[0]} isExternal>
                  <Text>{file?.name?.length > 20 ? shortenCid(file?.name, 10) : file?.name}</Text>
                </Link>
              </Tooltip>
            </Stack>
          )
        })}

      </Stack>
      <Text fontSize={"xs"} color={"gray"}>{parseDate(cogito.cogito.create_at)}</Text>
    </Stack>
  )
}

export default CogitoContent