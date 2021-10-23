import Content from "../../components/Content";
import {Stack, Text} from "@chakra-ui/react";
import {useCogitoIds} from "../../hooks/useCogitoIDs";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {Key, Suspense} from "react"
import WrappedCogitoItem from "../../components/CogitoItem";

const TimeLine = () => {
  return (
    <Content label={"TimeLine"} hasDivider>
      <Suspense fallback={<Text>Loading</Text>}>
       <CogitoList/>
      </Suspense>
    </Content>
  )
}

const CogitoList = () => {
  const {user} = useCurrentUser()
  const cogitos = useCogitoIds(user.addr)

  if (!user.loggedIn || !cogitos.ids) {
    return (
      <Stack>
        <Text>
          No cogito
        </Text>
      </Stack>
    )
  }

  return (
    <Stack spacing={2} direction={"row"} p={2}>
      {cogitos.ids.map((id: number, index: Key) => (
        <WrappedCogitoItem id={id} key={index}/>
      ))}
    </Stack>
  )
}

export default TimeLine
