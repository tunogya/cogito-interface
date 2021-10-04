import {Button, Heading, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {FC} from "react";

interface Props {
  name: string
  size: number
  type: string
}

const FileListItem: FC<Props> = ({...props}) => {
  return (
    <Menu>
      <MenuButton as={Button} size={"sm"}>
        {props.name}, {props.size}, {props.type}
      </MenuButton>
      <MenuList padding={0} borderRadius={"xl"} >
        <MenuItem>
          <Heading size={"xs"} fontWeight={"normal"}>View</Heading>
        </MenuItem>
        <MenuItem color={"red"}>
          <Heading size={"xs"} fontWeight={"normal"}>Delete</Heading>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default FileListItem