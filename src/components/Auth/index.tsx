import {Button, Divider, Heading, Link, Menu, MenuButton, MenuItem, MenuList, Stack} from "@chakra-ui/react";
import {t, Trans} from "@lingui/macro";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {ChevronDownIcon, CopyIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {useClipboard} from "@chakra-ui/react";
import {AiOutlineLogout} from "react-icons/all";
import shortenCid from "../../utils/shortenCid";

const Auth = () => {
  const {user, logIn, logOut} = useCurrentUser()
  const {hasCopied, onCopy} = useClipboard(user.addr ?? "")

  return (
    <Stack w={"250px"}>
      {user.loggedIn ? (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} fontWeight={"bold"} variant={"outline"}>
            {hasCopied ? (t`Copied!`) : shortenCid(user.addr ?? "", 6)}
          </MenuButton>
          <MenuList borderRadius={"xl"} padding={0}>
            <MenuItem onClick={onCopy} icon={<CopyIcon/>}>
              <Heading fontSize={"md"} fontWeight={"normal"}><Trans>Copy Address</Trans></Heading>
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon/>} as={Link} href={"https://www.baidu.com"} isExternal>
              <Heading fontSize={"md"} fontWeight={"normal"}><Trans>View on Explorer</Trans></Heading>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={logOut} color={"red"} icon={<AiOutlineLogout/>} fontWeight={"bold"}>
             <Heading fontSize={"md"} fontWeight={"normal"}><Trans>Log out</Trans></Heading>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button onClick={logIn} fontWeight={"bold"}>
          <Trans>Log in</Trans>
        </Button>
      )}
    </Stack>
  )
}

export default Auth