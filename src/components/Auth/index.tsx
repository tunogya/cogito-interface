import {Button, Divider, Heading, Link, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {t, Trans} from "@lingui/macro";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {ChevronDownIcon, CopyIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {useClipboard} from "@chakra-ui/react";
import {AiOutlineLogout} from "react-icons/all";

const Auth = () => {
  const {user, logIn, logOut} = useCurrentUser()
  const {hasCopied, onCopy} = useClipboard(user.addr ?? "")

  return (
    <>
      {user.loggedIn ? (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} fontWeight={"bold"}>
            {hasCopied ? (t`Copied!`) : user.addr}
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
    </>
  )
}

export default Auth