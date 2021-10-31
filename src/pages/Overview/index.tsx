import Content from "../../components/Content"
import {Heading, Spinner, Stack, Stat, StatHelpText, StatLabel, StatNumber} from "@chakra-ui/react"
import useFlowBalance from "../../hooks/useFlowBalance"
import useCurrentUser from "../../hooks/useCurrentUser"
import { Suspense } from "react"
import useCogitoSupply from "../../hooks/useCogitoSupply"
import { parseFlow } from "../../utils/parseFlow"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import useFlowStorage from "../../hooks/useFlowStorage"
import bytesToSize from "../../utils/bytesToSize"

const Overview = () => {
  const { width } = useWindowDimensions()

  return (
    <Content label={"Overview"} hasDivider hasTitle={width >= 640}>
      <Suspense fallback={
        <Stack p={4}>
          <Spinner/>
        </Stack>
      }>
        <OverviewContent/>
      </Suspense>
    </Content>
  )
}

const OverviewContent = () => {
  const { user } = useCurrentUser()
  const flow = useFlowBalance(user.addr)
  const supply = useCogitoSupply()
  const storage = useFlowStorage(user.addr)

  return (
    <Stack p={4} spacing={4}>
      <Stat p={4} borderRadius={"xl"} boxShadow={"base"}>
        <StatLabel>
          <Heading size={"xs"} fontWeight={"light"}>Cogito Supply</Heading>
        </StatLabel>
        <StatNumber>
          <Heading size={"md"}>
            {supply.supply}
          </Heading>
        </StatNumber>
      </Stat>
      { user.loggedIn && (
        <Stat p={4} borderRadius={"xl"} boxShadow={"base"}>
          <StatLabel>
            <Heading size={"xs"} fontWeight={"light"}>{user.addr}</Heading>
          </StatLabel>
          <StatNumber>
            {flow.balance && (
              <Heading size={"md"}>
                {parseFlow(flow.balance)} flow
              </Heading>
            )}
          </StatNumber>
          <StatHelpText>
            {storage.storage && (
              <Heading size={"xs"} fontWeight={"light"}>
                Storage: {bytesToSize(storage.storage.storageUsed)} / {bytesToSize(storage.storage.storageCapacity)},{" "}
                {((storage.storage.storageUsed / storage.storage.storageCapacity) * 100).toFixed(2)}% has used
              </Heading>
            )}
          </StatHelpText>
        </Stat>
      )}
    </Stack>
  )
}

export default Overview
