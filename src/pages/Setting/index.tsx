import {Button, Select, Stack, StackDivider, Text, useColorMode} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {CheckIcon, MoonIcon, SunIcon} from "@chakra-ui/icons";

const Setting = () => {
  const {colorMode, toggleColorMode} = useColorMode()

  return (
    <Stack w={"100%"} h={"100%"} spacing={6}>
      <Stack>
        <Text fontWeight={"bold"}>
          <Trans>Appearance</Trans>
        </Text>
        <Button onClick={toggleColorMode}>
          <Stack direction={"row"} justifyContent={"space-between"}
                 alignItems={"center"} w={"100%"}
          >
            <Text>
              <Trans>{colorMode === "light" ? ("Light mode") : ("Dark mode")} </Trans>
            </Text>
            {colorMode === "light" ? (
              <SunIcon/>
            ) : (
              <MoonIcon/>
            )}
          </Stack>
        </Button>

      </Stack>
      <Stack>
        <Text fontWeight={"bold"}>
          <Trans>Privacy and security</Trans>
        </Text>
      </Stack>
      <Stack>
        <Text fontWeight={"bold"}>
          <Trans>Language</Trans>
        </Text>
        <Select placeholder="Select language" variant={"filled"}>
          <option value="option1">English</option>
          <option value="option2">简体中文</option>
        </Select>
      </Stack>
    </Stack>
  )
}

export default Setting
