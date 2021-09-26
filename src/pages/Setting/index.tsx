import {Stack, Text, useColorMode} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {CheckIcon, MoonIcon, SunIcon} from "@chakra-ui/icons";

const Setting = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Stack w={"100%"} h={"100%"} spacing={6}>
      <Stack>
        <Text fontWeight={"bold"}>
          <Trans>Appearance</Trans>
        </Text>
        <Stack p={4} borderRadius={"md"}
               direction={"row"} justifyContent={"space-between"}
               alignItems={"center"}
               onClick={toggleColorMode}
        >
          <Text>
            <Trans>{ colorMode === "light" ? ("Light mode") : ("Dark mode")} </Trans>
          </Text>
          { colorMode === "light" ? (
            <SunIcon/>
          ) : (
            <MoonIcon/>
          )}
        </Stack>

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
        <Stack p={4} borderRadius={"md"} direction={"row"} justifyContent={"space-between"}>
          <Text>
            <Trans>English</Trans>
          </Text>
          <CheckIcon/>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Setting
