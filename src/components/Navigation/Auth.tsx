import {
  Button,
  Divider,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList, useColorMode,
} from "@chakra-ui/react"
import {Trans} from "@lingui/macro"
import useCurrentUser from "../../hooks/useCurrentUser"
import {ChevronDownIcon, CopyIcon, ExternalLinkIcon} from "@chakra-ui/icons"
import {useClipboard} from "@chakra-ui/react"
import {AiOutlineLogout} from "react-icons/all"
import shortenCid from "../../utils/shortenCid"
import useWindowDimensions from "../../hooks/useWindowDimensions"

const Auth = () => {
  const {user, logIn, logOut} = useCurrentUser()
  const {width} = useWindowDimensions()
  const {onCopy} = useClipboard(user.addr ?? "")
  const {colorMode} = useColorMode()

  return (
    <>
      {user.loggedIn ? (
        <Menu>
          {width >= 1200 || width <= 640 ? (
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} w={"100%"} fontWeight={"bold"} variant={"outline"}
                        isFullWidth>
              {shortenCid(user.addr ?? "", 6)}
            </MenuButton>
          ) : (
            <MenuButton as={Button} aria-label={"user"} variant={"ghost"} h={16} fontSize={"xx-small"} w={16} p={0}>
              {shortenCid(user.addr ?? "", 3)}
            </MenuButton>
          )}

          <MenuList borderRadius={"xl"} background={colorMode === "light" ? "white" : "black"}>
            <MenuItem onClick={onCopy} icon={<CopyIcon/>}>
              <Heading fontSize={"md"} fontWeight={"normal"}>
                <Trans>Copy Address</Trans>
              </Heading>
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon/>} as={Link}
                      href={(process.env.REACT_APP_CHAIN_ENV === "testnet"
                        ? "https://testnet.flowscan.org/account/"
                        : "https://flowscan.org/account/")
                      + user.addr}
                      isExternal>
              <Heading fontSize={"md"} fontWeight={"normal"}>
                <Trans>View on Explorer</Trans>
              </Heading>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={logOut} color={"red"} icon={<AiOutlineLogout/>} fontWeight={"bold"}>
              <Heading fontSize={"md"} fontWeight={"normal"}>
                <Trans>Log out</Trans>
              </Heading>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button onClick={logIn} fontWeight={"bold"} isFullWidth>
          <Trans>Log in</Trans>
        </Button>
      )}
    </>
  )
}

export default Auth
