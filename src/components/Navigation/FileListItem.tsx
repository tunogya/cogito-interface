import {Button, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text} from "@chakra-ui/react";
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
      <MenuButton as={Button} size={"sm"} maxW={"200px"} overflow={"scroll"} fontFamily={"sans-serif"} textTransform={"none"}>
        {props.name}
      </MenuButton>
      <MenuList borderRadius={"xl"}>
        <Text px={3} fontWeight={"bold"}>
          {props.name}
        </Text>
        <Text px={3}>
          {props.type}
        </Text>
        <Text px={3}>
          {props.size}
        </Text>
        <MenuDivider/>
        <MenuItem color={"red"} onClick={() => props.onDelete(props.name)}>
          <Heading size={"sm"} fontWeight={"normal"}>Delete</Heading>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default FileListItem