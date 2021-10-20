import Content from "../../components/Content";
import {Stack, Text} from "@chakra-ui/react";
import {useCogitoIds} from "../../hooks/useCogitoIDs";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {Key, Suspense} from "react"
import WrappedCogitoItem from "../../components/CogitoItem";

const TimeLine = () => {
  const {user} = useCurrentUser()
  const cogitos = useCogitoIds(user.addr)
  console.log(cogitos)

  if (!cogitos.ids) {
    return <SkeletonPage/>
  }

  return (
    <Content label={"TimeLine"} hasDivider>
      <Stack>
        <Text>{cogitos.length}个</Text>
        {cogitos.ids.map((id: number, index: Key) => (
          <WrappedCogitoItem id={id} key={index}/>
        ))}
      </Stack>
    </Content>
  )
}

const SkeletonPage = () => {
  return (
    <Text>Loading</Text>
  )
}

const WrappedTimeLine = () => {
  return (
    <Suspense fallback={<SkeletonPage/>}>
      <TimeLine/>
    </Suspense>
  )
}

export default WrappedTimeLine
