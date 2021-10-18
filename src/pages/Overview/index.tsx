import Content from "../../components/Content";
import {Text} from "@chakra-ui/react"
import useFlowBalance from "../../hooks/useFLowBalance";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {Suspense} from "react";

const Overview = () => {
  const {user} = useCurrentUser()
  const flow = useFlowBalance(user.addr)
  console.log(flow.balance)
  return (
    <Content label={"Overview"} hasDivider>
      <Text>neirong</Text>
    </Content>
  )
}

const WrappedOverview = () => {
  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <Overview/>
    </Suspense>
  )
}

export default WrappedOverview
