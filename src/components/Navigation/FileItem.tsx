import { Button, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { FC } from "react"
import { DeleteIcon } from "@chakra-ui/icons"
import shortenCid from "../../utils/shortenCid"
import { useRecoilState } from "recoil"
import { filesAtom } from "../../state/Files"

interface FileItemProps {
  name: string
}

const FileItem: FC<FileItemProps> = props => {
  const [files, setFiles] = useRecoilState(filesAtom)

  const handleDelete = (name: string) => {
    setFiles(files.filter(file => file.name !== name))
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        size={"sm"}
        maxW={48}
        overflow={"scroll"}
        fontFamily={"sans-serif"}
        textTransform={"none"}
      >
        {shortenCid(props.name, 6)}
      </MenuButton>
      <MenuList borderRadius={"xl"}>
        <Text px={3} fontWeight={"bold"}>
          {props.name}
        </Text>
        <MenuDivider />
        <MenuItem color={"red"} onClick={() => handleDelete(props.name)} icon={<DeleteIcon />}>
          <Heading size={"sm"} fontWeight={"normal"}>
            Delete
          </Heading>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default FileItem
