import {
  Button,
  Heading, IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList, Stack,
  Text,
} from "@chakra-ui/react";
import {FC, useEffect, useState} from "react";
import {useNFTStorage} from "../../hooks/useNFTStorage";
import {PROCESSING} from "../../constants/status";
import {CopyIcon, DeleteIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import bytesToSize from "../../utils/bytesToSize";
import shortenCid from "../../utils/shortenCid";
import parseUriToHttp from "../../utils/parseUriToHttp";
import {Attachment} from "../../constants/interfaces";
import parseIpfsCid from "../../utils/parseIpfsCid";

interface Props {
  attachment: Attachment
  onDelete: (fileName: string) => void
  onUpdate: (fileName: string, newAttachment: Attachment) => void
}

const FIleItem: FC<Props> = ({attachment, onDelete, onUpdate}) => {
  const storage = useNFTStorage()

  // the cid of file
  const [cid, setCid] = useState("")

  useEffect(() => {
    storage?.storeBlob(attachment.content).then((cid) => {
        setCid(cid)
        console.log("file: " + parseIpfsCid(cid))
        onUpdate(attachment.content.name, {...attachment, uri: parseIpfsCid(cid)})
      }
    )
  }, [attachment.content])

  return (
    <Menu>
      <MenuButton as={Button} size={"sm"} maxW={"200px"} overflow={"scroll"}
                  isLoading={storage?.state === PROCESSING}
                  spinnerPlacement="start" loadingText={attachment.content.name}
                  fontFamily={"sans-serif"} textTransform={"none"}>
        {attachment.content.name}
      </MenuButton>
      <MenuList borderRadius={"xl"}>
        <Text px={3} fontWeight={"bold"}>
          {attachment.content.name}
        </Text>
        <Text px={3} fontSize={"xs"}>
          {attachment.content.type}
        </Text>
        <Text px={3} fontSize={"xs"}>
          {bytesToSize(attachment.content.size)}
        </Text>
        <Stack direction={"row"} alignItems={"center"}>
          <Text px={3} fontSize={"xs"}>
            {shortenCid(cid, 8)}
          </Text>
          <IconButton aria-label={"copy"} icon={<CopyIcon/>} size={"xs"} variant={"ghost"}/>
        </Stack>

        <MenuDivider/>
        {cid !== "" && (
          <MenuItem icon={<ExternalLinkIcon/>} as={Link} href={parseUriToHttp("ipfs://" + cid)[0]} isExternal>
            <Heading size={"sm"} fontWeight={"normal"}>View on Explore</Heading>
          </MenuItem>
        )}
        <MenuItem color={"red"} onClick={() => onDelete(attachment.content.name)} icon={<DeleteIcon/>}>
          <Heading size={"sm"} fontWeight={"normal"}>Delete</Heading>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default FIleItem