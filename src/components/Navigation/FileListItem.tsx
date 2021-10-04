import {Button, Heading, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {FC} from "react";

interface Props {
  index: number
  name: string
  size: number
  type: string
  onDelete?: (index: number) => void
}

const FileListItem: FC<Props> = ({...props}) => {
  return (
    <Menu>
      <MenuButton as={Button} size={"sm"}>
        {props.index + 1}: {props.name}
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