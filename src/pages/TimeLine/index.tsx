import Content from "../../components/Content";
import {
  Spinner,
  Stack,
  Text
} from "@chakra-ui/react";
import {useCogitoIDs} from "../../hooks/useCogitoIDs";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {Key, Suspense} from "react"
import CogitoItem from "../../components/CogitoItem";

const CogitoList = () => {
  const {user} = useCurrentUser()
  const cogitoIDs = useCogitoIDs(user.addr)

  if (!user.loggedIn || !cogitoIDs.ids) {
    return (
      <Stack>
        <Text>
          No cogito
        </Text>
      </Stack>
    )
  }

  return (
    <Stack spacing={4} direction={"row"} p={4}>
      {cogitoIDs.ids.map((id: number, index: Key) => (
        <CogitoItem id={id} key={index}/>
      ))}
    </Stack>
  )
}

const TimeLine = () => {
  return (
    <Content label={"TimeLine"} hasDivider>
      <Suspense fallback={(
        <Stack p={4}>
          <Spinner/>
        </Stack>
      )}>
        <CogitoList/>
      </Suspense>
    </Content>
  )
}

export default TimeLine
