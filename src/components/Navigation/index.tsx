import {Button, Spacer, Stack, Text} from "@chakra-ui/react"
import {Trans} from "@lingui/macro"
import {useHistory} from "react-router-dom"
import {useState} from "react"
import {SmallAddIcon} from "@chakra-ui/icons"
import Auth from "../Auth";
import {
  AiFillSetting,
  AiFillStar,
  AiOutlineSetting,
  AiOutlineStar, RiUserSmileFill, RiUserSmileLine
} from "react-icons/all";


export const Navigation = () => {
  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)
  const links = [
    {pathname: "/", label: <Trans>Overview</Trans>, fillIcon: <RiUserSmileFill/>, outlineIcon: <RiUserSmileLine/>},
    {pathname: "/fresh", label: <Trans>Fresh Memory</Trans>, fillIcon: <AiFillStar/>, outlineIcon: <AiOutlineStar/>},
    {pathname: "/setting", label: <Trans>Setting</Trans>, fillIcon: <AiFillSetting/>, outlineIcon: <AiOutlineSetting/>},
  ]

  return (
    <Stack w={"100%"} h={"100%"} p={"8px 16px 16px 32px"}>
      <Stack pr={4}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          Cogito ergo sum-{process.env.REACT_APP_CHAIN_ENV}
        </Text>
        {links.map((link, index) => (
          <Stack direction={"row"} key={index}>
            <Button
              borderRadius={"3xl"}
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
        <Button leftIcon={<SmallAddIcon/>} borderRadius={"3xl"}>
          <Trans>Cogito</Trans>
        </Button>
      </Stack>
      <Spacer/>
      <Auth/>
    </Stack>
  )
}

export default Navigation
