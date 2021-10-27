import Content from "../../components/Content"
import {Text} from "@chakra-ui/react"
import useFlowBalance from "../../hooks/useFlowBalance"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { Suspense } from "react"
import useCogitoSupply from "../../hooks/useCogitoSupply"
import { parseFlow } from "../../utils/parseFlow"
import useSetupCogito from "../../hooks/useSetupCogito"
import { useCogitoIDs } from "../../hooks/useCogitoIDs"
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Overview = () => {
  const { user } = useCurrentUser()
  const flow = useFlowBalance(user.addr)
  // const supply = useCogitoSupply()
  // const init = useSetupCogito(user.addr)
  // const cogitoIDs = useCogitoIDs(user.addr)
  const {width} = useWindowDimensions()

  return (
    <Content label={"Overview"} hasDivider hasTitle={width >= 640}>
      <Text>{user.addr}</Text>
      {flow.balance && (
        <Text>Balance: {parseFlow(flow.balance)} FLOW</Text>
      )}
      {/*<Text>Cogito Supply: {supply.supply}</Text>*/}
      {/*<Text>Length: {cogitoIDs.length}</Text>*/}
      {/*<Text>{init.init ? "初始化 Cogito" : "未初始化 Cogito"}</Text>*/}
    </Content>
  )
}

const WrappedOverview = () => {
  return (
    <Suspense fallback={<Text>Loading</Text>}>
      <Overview />
    </Suspense>
  )
}

export default WrappedOverview
