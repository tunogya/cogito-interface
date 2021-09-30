import { Button, Spacer, Stack, Text } from "@chakra-ui/react"
import { Trans } from "@lingui/macro"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { SmallAddIcon} from "@chakra-ui/icons"
import {useCurrentUser} from "../../hooks/useCurrentUser"
import {
  AiFillInfoCircle,
  AiFillSetting,
  AiFillStar,
  AiOutlineInfoCircle,
  AiOutlineSetting,
  AiOutlineStar
} from "react-icons/all";

export const Navigation = () => {
  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)
  const links = [
    { pathname: "/", label: <Trans>Overview</Trans>, fillIcon: <AiFillInfoCircle />, outlineIcon: <AiOutlineInfoCircle />},
    { pathname: "/fresh", label: <Trans>Fresh Memory</Trans>, fillIcon: <AiFillStar />, outlineIcon: <AiOutlineStar /> },
    { pathname: "/setting", label: <Trans>Setting</Trans>, fillIcon: <AiFillSetting />, outlineIcon: <AiOutlineSetting /> },
  ]
  const { user, logIn } = useCurrentUser()
  return (
    <Stack w={"100%"} h={"100%"} p={"8px 16px 16px 32px"}>
      <Stack spacing={4} pr={4}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          Cogito ergo sum-{process.env.REACT_APP_CHAIN_ENV}
        </Text>
        {links.map((link, index) => (
          <Stack direction={"row"} key={index}>
            <Button
              leftIcon={currentPath === link.pathname ? link.fillIcon : link.outlineIcon}
              size={"lg"}
              variant={"ghost"}
              onClick={() => {
                history.push(link.pathname)
                setCurrentPath(link.pathname)
              }}
            >
              {link.label}
            </Button>
          </Stack>
        ))}
        <Button leftIcon={<SmallAddIcon />}>
          <Trans>Cogito</Trans>
        </Button>
      </Stack>

      <Spacer />
      { user.loggedIn ? (
        <Button>
          <Trans>{ user.addr }</Trans>
        </Button>
      ) : (
        <Button onClick={logIn}>
          <Trans>Log in</Trans>
        </Button>
      ) }
    </Stack>
  )
}

export default Navigation
