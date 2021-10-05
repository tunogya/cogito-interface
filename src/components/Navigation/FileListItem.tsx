import {Button, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {FC, useEffect, useState} from "react";
import {useNFTStorage} from "../../hooks/useNFTStorage";
import {PROCESSING} from "../../constants/status";

interface Props {
  file: File
  onDelete: (name: string) => void
}

const FileListItem: FC<Props> = ({file, onDelete}) => {
  const storage = useNFTStorage()
  const [result, setResult] = useState("")

  useEffect(() => {
    storage?.storeBlob(file).then((cid) =>
      setResult(cid)
    )
  }, [file])

  return (
    <Menu>
      <MenuButton as={Button} size={"sm"} maxW={"200px"} overflow={"scroll"}
                  isLoading={storage?.state === PROCESSING}
                  fontFamily={"sans-serif"} textTransform={"none"} >
        {file.name}
      </MenuButton>
      <MenuList borderRadius={"xl"}>
        <Text px={3} fontWeight={"bold"}>
          {file.name}
        </Text>
        <Text px={3}>
          {file.type}
        </Text>
        <Text px={3}>
          {file.size}
        </Text>
        <Text px={3}>
          {result}
        </Text>
        <MenuDivider/>
        <MenuItem color={"red"} onClick={() => onDelete(file.name)}>
          <Heading size={"sm"} fontWeight={"normal"}>Delete</Heading>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default FileListItem