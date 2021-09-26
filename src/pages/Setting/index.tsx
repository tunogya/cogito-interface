import {Stack, Text} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";

const Setting = () => {
  return (
    <Stack w={"100%"} h={"100%"}>
      <Text fontWeight={"bold"} fontSize={"xl"}>
        <Trans>Setting</Trans>
      </Text>
    </Stack>
  )
}

export default Setting
