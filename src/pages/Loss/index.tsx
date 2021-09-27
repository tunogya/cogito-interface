import { Stack, Text } from "@chakra-ui/react"
import { Trans } from "@lingui/macro"

const Loss = () => {
  return (
    <Stack width={"240px"} h={"100%"} spacing={4}>
      <Text fontWeight={"bold"} fontSize={"xl"}>
        <Trans>Memory Loss</Trans>
      </Text>
    </Stack>
  )
}

export default Loss
