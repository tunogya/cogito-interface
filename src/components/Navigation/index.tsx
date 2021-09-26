import {Button, Divider, Spacer, Stack, Text} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {useHistory} from "react-router-dom";
import {useState} from "react";

export const Navigation = () => {
  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)
  const links = [
    {pathname: "/", label: <Trans>Overview</Trans>},
    {pathname: "/fresh", label: <Trans>Fresh Memory</Trans>},
    {pathname: "/setting", label: <Trans>Setting</Trans>},
  ]

  return (
    <Stack width={"240px"} h={"100%"} spacing={4}>
      <Text fontWeight={"bold"} fontSize={"xl"}>Cogito ergo sum</Text>
      {links.map((link, index) => (
        <Stack direction={"row"} key={index}>
          <Button
            variant={"ghost"}
            fontWeight={currentPath === link.pathname ? "bold" : "normal"}
            onClick={() => {
              history.push(link.pathname)
              setCurrentPath(link.pathname)
            }}>
            {link.label}
          </Button>
        </Stack>
      ))}
      <Button>Cogito</Button>
      <Spacer/>
      <Button>MY ACCOUNT</Button>
    </Stack>
  )
}

export default Navigation