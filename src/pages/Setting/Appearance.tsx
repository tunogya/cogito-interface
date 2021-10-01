import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel, FormControl, FormLabel,
  Heading, IconButton, Spacer,
  Stack,
  StackDivider, Text, useColorMode
} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

const Appearance = () => {
  const {colorMode, toggleColorMode} = useColorMode()

  return (
    <AccordionItem>
      <AccordionButton>
        <Heading flex="1" textAlign="left" fontWeight={"bold"} fontSize={"md"}>
          <Trans>Appearance</Trans>
        </Heading>
        <AccordionIcon/>
      </AccordionButton>
      <AccordionPanel p={4}>
        <Stack divider={<StackDivider/>} pl={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts">
              {colorMode === "dark" ? (
                <Text>
                  <Trans>Dark mode</Trans>
                </Text>
              ) : (
                <Text>
                  <Trans>Light mode</Trans>
                </Text>
              )}
            </FormLabel>
            <Spacer/>
            <IconButton
              aria-label={"btn"}
              icon={colorMode === "dark" ? <MoonIcon/> : <SunIcon/>}
              size={"sm"}
              onClick={toggleColorMode}
            />
          </FormControl>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default Appearance