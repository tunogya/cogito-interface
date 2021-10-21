import {Button, Heading, Spacer, Stack} from "@chakra-ui/react"
import {Trans} from "@lingui/macro"
import {useHistory} from "react-router-dom"
import {useState, Suspense} from "react"
import Auth from "../Auth";
import {
  AiFillSetting,
  AiOutlineSetting, GiExtraTime, GiSandsOfTime,
  RiUserSmileFill, RiUserSmileLine
} from "react-icons/all";
import MintCogito from "./MintCogito";
import Support from "./Support";
import useSetupCogito from "../../hooks/useSetupCogito";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {PROCESSING} from "../../constants/status";

export const Navigation = () => {
  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)
  const links = [
    {pathname: "/", label: <Trans>Overview</Trans>, fillIcon: <RiUserSmileFill/>, outlineIcon: <RiUserSmileLine/>},
    {pathname: "/timeline", label: <Trans>Timeline</Trans>, fillIcon: <GiExtraTime/>, outlineIcon: <GiSandsOfTime/>},
    {pathname: "/setting", label: <Trans>Setting</Trans>, fillIcon: <AiFillSetting/>, outlineIcon: <AiOutlineSetting/>},
  ]
  const {user} = useCurrentUser()
  const init = useSetupCogito(user.addr)

  return (
    <Stack w={"100%"} h={"100%"} p={"16px"}>
      <Stack pr={4} spacing={2} w={"250px"} ml={"auto"} h={"100%"}>
        <Heading fontSize={"2xl"} mb={2}>Cogito ergo sum</Heading>
        {links.map((link, index) => (
          <Stack direction={"row"} key={index}>
            <Button
              leftIcon={currentPath === link.pathname ? link.fillIcon : link.outlineIcon}
              fontWeight={currentPath === link.pathname ? "bold" : "normal"}
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
        {user.loggedIn && (
          <Stack>
            {init.init ? (
              <MintCogito/>
            ) : (
              <Button onClick={init.setup} isLoading={init.status === PROCESSING}>Setup Cogito First</Button>
            )}
          </Stack>
        )}
        <Spacer/>
        <Auth/>
        <Support/>
      </Stack>
    </Stack>
  )
}

const SkeletonPage = () => {
  return (
    <Stack w={"100%"} h={"100%"} p={"8px 16px 16px 32px"}>
      <Stack pr={4} spacing={3}>
        <Heading fontSize={"2xl"} mb={4}>Cogito ergo sum</Heading>
        <Spacer/>
      </Stack>
    </Stack>
  )
}

const WrappedNavigation = () => {
  return (
    <Suspense fallback={<SkeletonPage/>}>
      <Navigation/>
    </Suspense>
  )
}

export default WrappedNavigation
