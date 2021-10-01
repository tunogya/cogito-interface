import {Link, Stack, Text} from "@chakra-ui/react"
import {FaGithub, FaDiscord} from "react-icons/all";

const Support = () => {
  return (
    <Stack>
      <Text fontSize={"xs"} pt={3}>Made with ❤️️ by <Link href={"https://wakandalabs.cn/"} isExternal>Wakanda Labs</Link></Text>
      <Stack direction={"row"}>
        <Link isExternal href={"https://github.com/wakandalabs/cogito-interface/"}>
          <FaGithub/>
        </Link>
        <Link isExternal>
          <FaDiscord />
        </Link>
      </Stack>
    </Stack>
  )
}

export default Support