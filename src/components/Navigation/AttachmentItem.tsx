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
import {parseCidToHttpUrl} from "../../utils/ipfs";
import {shortenCid} from "../../utils/ipfs";
import {CopyIcon, DeleteIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {bytesToSize} from "../../utils";
import {BsImage} from "react-icons/all";
import {Attachment} from "../../constants/NFT";

interface Props {
  attachment: Attachment
  onDelete: (fileName: string) => void
  onUpdate: (fileName: string, newAttachment: Attachment) => void
}

const AttachmentItem: FC<Props> = ({attachment, onDelete, onUpdate}) => {
  const storage = useNFTStorage()

  // the result of file cid
  const [result, setResult] = useState("")

  useEffect(() => {
    storage?.storeBlob(attachment.content).then((cid) => {
        setResult(cid)
        onUpdate(attachment.content.name, {
          fileName: attachment.fileName,
          content: attachment.content,
          cid: cid
        })
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
            {shortenCid(result, 8)}
          </Text>
          <IconButton aria-label={"copy"} icon={<CopyIcon/>} size={"xs"} variant={"ghost"}/>
        </Stack>

        <MenuDivider/>
        <MenuItem icon={<BsImage/>}>
          <Heading size={"sm"} fontWeight={"normal"}>As Cover</Heading>
        </MenuItem>
        {result !== "" && (
          <MenuItem icon={<ExternalLinkIcon/>} as={Link} href={parseCidToHttpUrl(result)} isExternal>
            <Heading size={"sm"} fontWeight={"normal"}>View</Heading>
          </MenuItem>
        )}
        <MenuItem color={"red"} onClick={() => onDelete(attachment.content.name)} icon={<DeleteIcon/>}>
          <Heading size={"sm"} fontWeight={"normal"}>Delete</Heading>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default AttachmentItem