import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel, FormControl,
  Heading, Select,
  Stack,
  StackDivider
} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {LOCALE_LABEL, SUPPORTED_LOCALES} from "../../constants/locales";
import {useActiveLocale} from "../../hooks/useActiveLocale";

const Language = () => {
  const {locale, switchLocale} = useActiveLocale()

  return (
    <AccordionItem>
      <AccordionButton>
        <Heading flex="1" textAlign="left" fontWeight={"normal"} fontSize={"md"}>
          <Trans>Language</Trans>
        </Heading>
        <AccordionIcon/>
      </AccordionButton>
      <AccordionPanel p={4}>
        <Stack divider={<StackDivider/>} pl={4}>
          <FormControl display="flex" alignItems="center">
            <Select defaultValue={locale} onChange={(e) => switchLocale(e.target.value)}>
              {SUPPORTED_LOCALES.map((locale, index) => (
                <option key={index} value={locale}>
                  {LOCALE_LABEL[locale]}
                </option>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default Language