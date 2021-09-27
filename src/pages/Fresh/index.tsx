import { Stack, Text } from "@chakra-ui/react"
import { Trans } from "@lingui/macro"

const Fresh = () => {
  return (
    <Stack w={"100%"} h={"100%"}>
      <Text fontWeight={"bold"} fontSize={"xl"}>
        <Trans>Fresh Memory</Trans>
      </Text>
    </Stack>
  )
}

export default Fresh
