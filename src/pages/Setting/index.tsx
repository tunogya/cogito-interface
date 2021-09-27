import {
  Accordion,
  AccordionButton, AccordionIcon,
  AccordionItem, AccordionPanel,
  FormControl, FormLabel, IconButton,
  Select, Spacer,
  Stack,
  StackDivider,
  Text,
  useColorMode
} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {LOCALE_LABEL, SUPPORTED_LOCALES} from "../../constants/locales";
import {useActiveLocale} from "../../hooks/useActiveLocale";

const Setting = () => {
  const {colorMode, toggleColorMode} = useColorMode()
  const {locale, switchLocale} = useActiveLocale()

  return (
    <Accordion defaultIndex={[0]} allowMultiple w={"100%"}>
      <AccordionItem>
        <AccordionButton>
          <Text flex="1" textAlign="left" fontWeight={"bold"}>
            <Trans>Appearance</Trans>
          </Text>
          <AccordionIcon/>
        </AccordionButton>
        <AccordionPanel p={4}>
          <Stack divider={<StackDivider/>}>
            <FormControl display="flex" alignItems="center" pl={4}>
              <FormLabel htmlFor="email-alerts">
                {colorMode === "dark" ? (
                  <Text><Trans>Dark mode</Trans></Text>
                ) : (
                  <Text><Trans>Light mode</Trans></Text>
                )}
              </FormLabel>
              <Spacer/>
              <IconButton aria-label={"btn"} icon={colorMode === "dark" ? <MoonIcon/> : <SunIcon/>}
                          size={"sm"}
                          onClick={toggleColorMode}/>
            </FormControl>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          <Text flex="1" textAlign="left" fontWeight={"bold"}>
            <Trans>Language</Trans>
          </Text>
          <AccordionIcon/>
        </AccordionButton>
        <AccordionPanel p={4}>
          <Stack divider={<StackDivider/>}>
            <FormControl display="flex" alignItems="center" pl={4}>
              <Select defaultValue={locale}>
                {SUPPORTED_LOCALES.map((locale, index) => (
                  <option key={index} value={locale}
                          onClick={() => switchLocale(locale)}>{LOCALE_LABEL[locale]}</option>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default Setting
