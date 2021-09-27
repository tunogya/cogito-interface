import { Button, Spacer, Stack, Text } from "@chakra-ui/react"
import { Trans } from "@lingui/macro"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { SmallAddIcon, InfoIcon, SettingsIcon, StarIcon } from "@chakra-ui/icons"

export const Navigation = () => {
  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)
  const links = [
    { pathname: "/", label: <Trans>Overview</Trans>, icon: <InfoIcon /> },
    { pathname: "/fresh", label: <Trans>Fresh Memory</Trans>, icon: <StarIcon /> },
    { pathname: "/setting", label: <Trans>Setting</Trans>, icon: <SettingsIcon /> },
  ]

  return (
    <Stack width={"240px"} h={"100%"} spacing={4}>
      <Text fontWeight={"bold"} fontSize={"xl"}>
        Cogito ergo sum
      </Text>
      {links.map((link, index) => (
        <Stack direction={"row"} key={index}>
          <Button
            leftIcon={link.icon}
            variant={"ghost"}
            opacity={currentPath === link.pathname ? "1" : "0.8"}
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
      <Spacer />
      <Button>
        <Trans>MY ACCOUNT</Trans>
      </Button>
    </Stack>
  )
}

export default Navigation