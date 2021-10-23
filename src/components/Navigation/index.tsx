import { Button, Heading, IconButton, Spacer, Stack, Text } from "@chakra-ui/react"
import { Trans } from "@lingui/macro"
import { useHistory } from "react-router-dom"
import { useState, Suspense } from "react"
import Auth from "./Auth"
import { GiExtraTime, GiSandsOfTime, RiUserSmileFill, RiUserSmileLine } from "react-icons/all"
import MintCogito from "./MintCogito"
import Support from "./Support"
import useSetupCogito from "../../hooks/useSetupCogito"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { PROCESSING } from "../../constants/status"
import useWindowDimensions from "../../hooks/useWindowDimensions"

export const Navigation = () => {
  const history = useHistory()
  const { width } = useWindowDimensions()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)
  const links = [
    { pathname: "/", label: <Trans>Overview</Trans>, fillIcon: <RiUserSmileFill />, outlineIcon: <RiUserSmileLine /> },
    {
      pathname: "/timeline",
      label: <Trans>Timeline</Trans>,
      fillIcon: <GiExtraTime />,
      outlineIcon: <GiSandsOfTime />,
    },
  ]

  if (width < 640) {
    return (
      <Stack
        direction={"row"}
        h={20}
        justifyContent={"space-around"}
        alignItems={"center"}
        zIndex={"docked"}
        borderTop={"1px #F5F5F5"}
      >
        {links.map((link, index) => (
          <IconButton
            aria-label={"icon"}
            variant={"ghost"}
            key={index}
            fontWeight={currentPath === link.pathname ? "bold" : "normal"}
            onClick={() => {
              history.push(link.pathname)
              setCurrentPath(link.pathname)
            }}
            icon={currentPath === link.pathname ? link.fillIcon : link.outlineIcon}
          />
        ))}
        <Auth />
        <Suspense fallback={null}>
          <WrappedMintButton />
        </Suspense>
      </Stack>
    )
  }

  return (
    <Stack h={"100%"} p={[2, 2, 2, 4]} spacing={2}>
      {width >= 1200 ? (
        <Heading fontSize={"md"} mb={4}>
          Cogito ergo sum
        </Heading>
      ) : (
        <Heading fontSize={"md"} mb={4} textAlign={"center"}>
          Cogito
        </Heading>
      )}
      {links.map((link, index) => (
        <Stack direction={"row"} key={index} justifyContent={width >= 1200 ? "flex-start" : "center"}>
          {width >= 1200 ? (
            <Button
              leftIcon={currentPath === link.pathname ? link.fillIcon : link.outlineIcon}
              fontWeight={currentPath === link.pathname ? "bold" : "normal"}
              variant={"ghost"}
              onClick={() => {
                history.push(link.pathname)
                setCurrentPath(link.pathname)
              }}
            >
              <Text>{link.label}</Text>
            </Button>
          ) : (
            <IconButton
              aria-label={"icon"}
              variant={"ghost"}
              fontWeight={currentPath === link.pathname ? "bold" : "normal"}
              onClick={() => {
                history.push(link.pathname)
                setCurrentPath(link.pathname)
              }}
              icon={currentPath === link.pathname ? link.fillIcon : link.outlineIcon}
            />
          )}
        </Stack>
      ))}
      <Suspense fallback={null}>
        <WrappedMintButton />
      </Suspense>
      <Spacer />
      <Auth />
      {width >= 1200 && <Support />}
    </Stack>
  )
}

const WrappedMintButton = () => {
  const { user } = useCurrentUser()
  const init = useSetupCogito(user.addr)

  if (!user.loggedIn) {
    return null
  }
  return (
    <Stack alignItems={"center"}>
      {init.init ? (
        <MintCogito />
      ) : (
        <Button onClick={init.setup} isLoading={init.status === PROCESSING}>
          Setup Cogito First
        </Button>
      )}
    </Stack>
  )
}

export default Navigation
