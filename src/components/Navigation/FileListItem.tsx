import {Button, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {FC, useEffect} from "react";
import {useNFTStorage} from "../../hooks/useNFTStorage";

interface Props {
  file: File
  onDelete: (name: string) => void
}

const FileListItem: FC<Props> = ({file, onDelete}) => {
  const storage = useNFTStorage()

  useEffect(() => {
    storage?.storeBlob(file)
  }, [file, storage])

  return (
    <Menu>
      <MenuButton as={Button} size={"sm"} maxW={"200px"} overflow={"scroll"} fontFamily={"sans-serif"} textTransform={"none"}>
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
        <MenuDivider/>
        <MenuItem color={"red"} onClick={() => onDelete(file.name)}>
          <Heading size={"sm"} fontWeight={"normal"}>Delete</Heading>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default FileListItem