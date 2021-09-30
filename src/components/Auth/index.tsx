import {Button, Divider, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
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
          <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} borderRadius={"3xl"}>
            {hasCopied ? (t`Copied!`) : user.addr}
          </MenuButton>
          <MenuList borderRadius={"xl"}>
            <MenuItem onClick={onCopy} icon={<CopyIcon/>}>
              <Trans>Copy Address</Trans>
            </MenuItem>
            <MenuItem onClick={onCopy} icon={<ExternalLinkIcon/>}>
              <Trans>View on Explorer</Trans>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={logOut} color={"red"} icon={<AiOutlineLogout/>} fontWeight={"bold"}>
             <Trans>Log out</Trans>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button onClick={logIn}>
          <Trans>Log in</Trans>
        </Button>
      )}
    </>
  )
}

export default Auth