import {Button, Heading, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {FC} from "react";

interface Props {
  name: string
  size: number
  type: string
  onDelete: (name: string) => void
}

const FileListItem: FC<Props> = ({...props}) => {
  return (
    <Menu>
      <MenuButton as={Button} size={"sm"}>
        {props.name}
      </MenuButton>
      <MenuList padding={0} borderRadius={"xl"}>
        <MenuItem>
          <Heading size={"xs"} fontWeight={"normal"}>View</Heading>
        </MenuItem>
        <MenuItem color={"red"} onClick={() => props.onDelete(props.name)}>
          <Heading size={"xs"} fontWeight={"normal"}>Delete</Heading>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default FileListItem