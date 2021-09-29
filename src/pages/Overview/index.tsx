import {Box, Divider, Text} from "@chakra-ui/react"
import { Trans } from "@lingui/macro"

const Overview = () => {
  return (
    <Box w={"100%"} h={"100%"}>
      <Text fontWeight={"bold"} fontSize={"xl"} p={"8px 16px"}>
        <Trans>Overview</Trans>
      </Text>
      <Divider/>
    </Box>
  )
}

export default Overview
