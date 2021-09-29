import { Button, Spacer, Stack, Text } from "@chakra-ui/react"
import { Trans } from "@lingui/macro"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { SmallAddIcon, InfoIcon, SettingsIcon, StarIcon } from "@chakra-ui/icons"
import {useCurrentUser} from "../../hooks/useCurrentUser"

export const Navigation = () => {
  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)
  const links = [
    { pathname: "/", label: <Trans>Overview</Trans>, icon: <InfoIcon /> },
    { pathname: "/fresh", label: <Trans>Fresh Memory</Trans>, icon: <StarIcon /> },
    { pathname: "/setting", label: <Trans>Setting</Trans>, icon: <SettingsIcon /> },
  ]
  const { user, logIn } = useCurrentUser()
  return (
    <Stack w={"100%"} h={"100%"} p={"8px 16px 16px 32px"}>
      <Stack spacing={4} pr={"16px"}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          Cogito ergo sum-{process.env.REACT_APP_CHAIN_ENV}
        </Text>
        {links.map((link, index) => (
          <Stack direction={"row"} key={index}>
            <Button
              leftIcon={link.icon}
              size={"lg"}
              variant={"ghost"}
              onClick={() => {
                history.push(link.pathname)
                setCurrentPath(link.pathname)
              }}
            >
              <Text fontWeight={currentPath === link.pathname ? "bold": "normal" }>{link.label}</Text>
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
