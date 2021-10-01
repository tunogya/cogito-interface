import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel, Button, FormControl, FormHelperText, FormLabel,
  Heading, IconButton, Input, InputGroup, InputRightElement, Link,
  Stack,
  StackDivider, useClipboard
} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {CopyIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {useCurrentUser} from "../../hooks/useCurrentUser";

const ApiKeys = () => {
  const {hasCopied, onCopy} = useClipboard(process.env.REACT_APP_NFT_STORAGE_DEFAULT_KEY || "error")
  const [key, setKey] = useState("")
  const {user} = useCurrentUser()

  return (
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
                  <Button h="1.75rem" size="sm" disabled={!user.loggedIn}>Update</Button>
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
  )
}

export default ApiKeys