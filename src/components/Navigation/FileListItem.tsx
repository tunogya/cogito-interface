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

interface Props {
  store: { file: File, cid: string }
  onDelete: (name: string) => void
  onSetCid: (name: string, newStore: { file: File, cid: string }) => void
}

const FileListItem: FC<Props> = ({store, onDelete, onSetCid}) => {
  const storage = useNFTStorage()
  const [result, setResult] = useState("")

  useEffect(() => {
    storage?.storeBlob(store.file).then((cid) => {
        setResult(cid)
        onSetCid(store.file.name, {
          file: store.file,
          cid: cid
        })
      }
    )
  }, [store.file])

  return (
    <Menu>
      <MenuButton as={Button} size={"sm"} maxW={"200px"} overflow={"scroll"}
                  isLoading={storage?.state === PROCESSING}
                  spinnerPlacement="start" loadingText={store.file.name}
                  fontFamily={"sans-serif"} textTransform={"none"}>
        {store.file.name}
      </MenuButton>
      <MenuList borderRadius={"xl"}>
        <Text px={3} fontWeight={"bold"}>
          {store.file.name}
        </Text>
        <Text px={3} fontSize={"xs"}>
          {store.file.type}
        </Text>
        <Text px={3} fontSize={"xs"}>
          {bytesToSize(store.file.size)}
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
        <MenuItem color={"red"} onClick={() => onDelete(store.file.name)} icon={<DeleteIcon/>}>
          <Heading size={"sm"} fontWeight={"normal"}>Delete</Heading>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default FileListItem