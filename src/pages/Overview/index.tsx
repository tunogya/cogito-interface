import Content from "../../components/Content"
import { Text } from "@chakra-ui/react"
import useFlowBalance from "../../hooks/useFlowBalance"
import useCurrentUser from "../../hooks/useCurrentUser"
import { Suspense } from "react"
import useCogitoSupply from "../../hooks/useCogitoSupply"
import { parseFlow } from "../../utils/parseFlow"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import useFlowStorage from "../../hooks/useFlowStorage"
import bytesToSize from "../../utils/bytesToSize"

const Overview = () => {
  const { user } = useCurrentUser()
  const flow = useFlowBalance(user.addr)
  const supply = useCogitoSupply()
  const storage = useFlowStorage(user.addr)
  const { width } = useWindowDimensions()

  return (
    <Content label={"Overview"} hasDivider hasTitle={width >= 640}>
      <Text>{user.addr}</Text>
      {flow.balance && <Text>Balance: {parseFlow(flow.balance)} FLOW</Text>}
      <Text>Cogito Supply: {supply.supply}</Text>
      {storage.storage && (
        <Text>
          {bytesToSize(storage.storage.storageUsed)} / {bytesToSize(storage.storage.storageCapacity)},{" "}
          {((storage.storage.storageUsed / storage.storage.storageCapacity) * 100).toFixed(2)}% used
        </Text>
      )}
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
