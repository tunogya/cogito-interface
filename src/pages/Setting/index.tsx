import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel, Button,
  FormControl, FormHelperText,
  FormLabel, Heading,
  IconButton, Input, InputGroup, InputRightElement, Link,
  Select,
  Spacer,
  Stack,
  StackDivider,
  Text, useClipboard,
  useColorMode,
} from "@chakra-ui/react"
import {Trans} from "@lingui/macro"
import {CopyIcon, ExternalLinkIcon, MoonIcon, SunIcon} from "@chakra-ui/icons"
import {LOCALE_LABEL, SUPPORTED_LOCALES} from "../../constants/locales"
import {useActiveLocale} from "../../hooks/useActiveLocale"
import Content from "../../components/Content";
import {useState} from "react";

const Setting = () => {
  const {colorMode, toggleColorMode} = useColorMode()
  const {locale, switchLocale} = useActiveLocale()
  const {hasCopied, onCopy} = useClipboard(process.env.REACT_APP_NFT_STORAGE_DEFAULT_KEY || "error")
  const [key, setKey] = useState("")

  return (
    <Content label={"Setting"}>
      <Accordion defaultIndex={[]} allowMultiple w={"100%"}>
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
        <AccordionItem>
          <AccordionButton>
            <Heading flex="1" textAlign="left" fontWeight={"bold"} fontSize={"md"}>
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
        <AccordionItem>
          <AccordionButton>
            <Heading flex="1" textAlign="left" fontWeight={"bold"} fontSize={"md"}>
              <Trans>API Keys</Trans>
            </Heading>
            <AccordionIcon/>
          </AccordionButton>
          <AccordionPanel p={4}>
            <Stack divider={<StackDivider/>} pl={4}>
              <FormControl id={"api-keys"}>
                <FormLabel>
                  <Link href={"https://nft.storage/"} isExternal>
                    nft.storage <ExternalLinkIcon mx="2px"/>
                  </Link>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    placeholder="visit https://nft.storage/"
                    onChange={(e) => setKey(e.target.value)}
                  />
                  {key !== "" && (
                    <InputRightElement width="5.6rem">
                      <Button h="1.75rem" size="sm">Update</Button>
                    </InputRightElement>
                  )}
                </InputGroup>
                <FormHelperText>
                  You can copy to use Wakanda Labs' keys.
                  <IconButton aria-label={"copy"} icon={<CopyIcon/>} size={"xs"} variant={"ghost"} onClick={onCopy}/>
                  {hasCopied && (
                    "Copied!"
                  )}
                </FormHelperText>
              </FormControl>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Content>
  )
}

export default Setting
