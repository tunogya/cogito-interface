import { FC, Key } from "react"
import useCogitoTokenURI from "../../hooks/useCogitoTokenURI"
import {
  Badge,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react"
import { parseDate } from "../../utils/parseDate"
import parseUriToHttp from "../../utils/parseUriToHttp"
import shortenCid from "../../utils/shortenCid"
import { AttachmentIcon } from "@chakra-ui/icons"
import { Trans } from "@lingui/macro"
import { AiOutlineDelete, FiMoreHorizontal } from "react-icons/all"
import useCogitoBurner from "../../hooks/useCogitoBurner"
import { PROCESSING } from "../../constants/status"
import useCogitoIDs from "../../hooks/useCogitoIDs"

interface CogitoContentProps {
  address: string | null
  id: number
}

const CogitoContent: FC<CogitoContentProps> = props => {
  const { uri, cogito } = useCogitoTokenURI(props.address, props.id)
  const { colorMode } = useColorMode()
  const burner = useCogitoBurner(props.id)
  const { refresh } = useCogitoIDs(props.address)

  return (
    <Stack>
      <Text>{cogito.text}</Text>
      <Stack direction={"row"}>
        {cogito.attachment?.map((name: string, index: Key) => {
          return (
            <Stack as={Badge} key={index} direction={"row"} alignItems={"center"} colorScheme={"purple"}>
              <AttachmentIcon />
              <Tooltip label={name} borderRadius={"xl"} bg={colorMode === "light" ? "black" : "white"}>
                <Link href={parseUriToHttp(uri)[0] + name} isExternal>
                  <Text>{name.length > 20 ? shortenCid(name, 10) : name}</Text>
                </Link>
              </Tooltip>
            </Stack>
          )
        })}
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
        <Text fontSize={"xs"} color={"gray"}>
          {parseDate(cogito.create_at)}
        </Text>
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            isLoading={burner.status === PROCESSING}
            aria-label="Options"
            icon={<FiMoreHorizontal />}
            size={"sm"}
            variant="ghost"
          />
          <MenuList borderRadius={"xl"} background={colorMode === "light" ? "white" : "black"}>
            <MenuItem
              icon={<AiOutlineDelete />}
              color={"red"}
              onClick={async () => {
                await burner.burn()
                await refresh()
              }}
            >
              <Heading fontSize={"md"} fontWeight={"normal"}>
                <Trans>Burn</Trans>
              </Heading>
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Stack>
  )
}

export default CogitoContent
