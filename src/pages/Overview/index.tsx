import { Stack, Text } from "@chakra-ui/react"
import { Trans } from "@lingui/macro"

const Overview = () => {
  return (
    <Stack w={"100%"} h={"100%"}>
      <Text fontWeight={"bold"} fontSize={"xl"}>
        <Trans>Overview</Trans>
      </Text>
    </Stack>
  )
}

export default Overview
