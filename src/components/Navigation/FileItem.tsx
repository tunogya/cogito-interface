import { Button, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { FC } from "react"
import { useNFTStorage } from "../../hooks/useNFTStorage"
import { PROCESSING } from "../../constants/status"
import { DeleteIcon } from "@chakra-ui/icons"
import shortenCid from "../../utils/shortenCid"
import {useRecoilState} from "recoil";
import {filesAtom} from "./MintCogito";

const FileItem: FC<{name: string}> = ({ name }) => {
  const storage = useNFTStorage()
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
        isLoading={storage?.state === PROCESSING}
        spinnerPlacement="start"
        loadingText={shortenCid(name, 6)}
        fontFamily={"sans-serif"}
        textTransform={"none"}
      >
        { shortenCid(name, 6)}
      </MenuButton>
      <MenuList borderRadius={"xl"}>
        <Text px={3} fontWeight={"bold"}>
          {name}
        </Text>
        <MenuDivider />
        <MenuItem color={"red"} onClick={() => handleDelete(name)} icon={<DeleteIcon />}>
          <Heading size={"sm"} fontWeight={"normal"}>
            Delete
          </Heading>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default FileItem
