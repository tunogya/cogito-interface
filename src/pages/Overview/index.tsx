import Content from "../../components/Content";
import { Button, Text} from "@chakra-ui/react"
import useFlowBalance from "../../hooks/useFlowBalance";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {Suspense} from "react";
import useCogitoSupply from "../../hooks/useCogitoSupply";
import {parseFlow} from "../../utils/parseFlow";
import useInitCogito from "../../hooks/useInitCogito";
import {PROCESSING} from "../../constants/status";

const Overview = () => {
  const {user} = useCurrentUser()
  const flow = useFlowBalance(user.addr)
  const supply = useCogitoSupply()
  const init = useInitCogito(user.addr)
  return (
    <Content label={"Overview"} hasDivider>
      <Text>{user.addr}</Text>
      <Text>Balance: {parseFlow(flow.balance)} FLOW</Text>
      <Text>Cogito Supply: {supply.supply}</Text>
      <Text>{init.init ? "初始化 Cogito" : "未初始化 Cogito" }</Text>
      <Button onClick={init.initialize} disabled={!user.loggedIn || init.init} isLoading={init.status === PROCESSING}>
        初始化账户
      </Button>
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
