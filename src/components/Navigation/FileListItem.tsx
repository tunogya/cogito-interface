import {Button, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {FC, useEffect, useState} from "react";
import {useNFTStorage} from "../../hooks/useNFTStorage";
import {PROCESSING} from "../../constants/status";

interface Props {
  store: { file: File, cid: string }
  onDelete: (name: string) => void
  onSetCid: (name: string, newStore: {file: File, cid: string}) => void
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
                  fontFamily={"sans-serif"} textTransform={"none"}>
        {store.file.name}
      </MenuButton>
      <MenuList borderRadius={"xl"}>
        <Text px={3} fontWeight={"bold"}>
          {store.file.name}
        </Text>
        <Text px={3}>
          {store.file.type}
        </Text>
        <Text px={3}>
          {store.file.size}
        </Text>
        <Text px={3}>
          {result}
        </Text>
        <MenuDivider/>
        <MenuItem color={"red"} onClick={() => onDelete(store.file.name)}>
          <Heading size={"sm"} fontWeight={"normal"}>Delete</Heading>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default FileListItem