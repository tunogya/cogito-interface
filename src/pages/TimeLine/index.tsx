import Content from "../../components/Content"
import {Accordion, Button, Heading, Spinner, Stack, Text} from "@chakra-ui/react"
import useCogitoIDs from "../../hooks/useCogitoIDs"
import useCurrentUser from "../../hooks/useCurrentUser"
import { Key, Suspense } from "react"
import CogitoItem from "../../components/CogitoItem"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import useSetupCogito from "../../hooks/useSetupCogito"
import { PROCESSING } from "../../constants/status"

const CogitoList = () => {
  const { user } = useCurrentUser()
  const { ids } = useCogitoIDs(user.addr)

  if (!user.loggedIn || ids.length === 0) {
    return (
      <Stack p={4} boxShadow={"base"} m={4} borderRadius={"xl"}>
        <Heading size={"md"} fontWeight={"light"}>Sorry, no cogito in your account.</Heading>
      </Stack>
    )
  }

  return (
    <Accordion defaultIndex={[]} allowMultiple w={"100%"}>
      {ids.map((id: number, index: Key) => (
        <CogitoItem address={user.addr} id={id} key={index} />
      ))}
    </Accordion>
  )
}

const TimeLine = () => {
  const { width } = useWindowDimensions()

  return (
    <Content label={"TimeLine"} hasTitle={width >= 640} hasDivider>
      <Suspense
        fallback={
          <Stack p={4}>
            <Spinner />
          </Stack>
        }
      >
        <WrappedCogitoList />
      </Suspense>
    </Content>
  )
}

const WrappedCogitoList = () => {
  const { user } = useCurrentUser()
  const { init, setup, status } = useSetupCogito(user.addr)

  if (!user.loggedIn) {
    return (
      <Stack p={4} boxShadow={"base"} m={4} borderRadius={"xl"}>
        <Heading size={"md"} fontWeight={"light"}>You need to log in</Heading>
      </Stack>
    )
  }

  if (init) {
    return <CogitoList />
  }

  return (
    <Stack>
      <Button onClick={setup} isLoading={status === PROCESSING}>
        Setup Cogito First
      </Button>
    </Stack>
  )
}

export default TimeLine
