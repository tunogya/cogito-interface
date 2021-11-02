import { Button, Heading, Input, Link, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { fetchCogito, fetchUri } from "../../hooks/useCogitoTokenURI"
import parseUriToHttp from "../../utils/parseUriToHttp"
import {Trans} from "@lingui/macro";

const Explore = (props: any) => {
  const [address, setAddress] = useState("")
  const [id, setId] = useState(0)
  const [uri, setUri] = useState(undefined)
  const [cogito, setCogito] = useState()

  return (
    <Stack py={2} px={4} h={"100%"} {...props}>
      <Input
        variant={"filled"}
        placeholder={"address"}
        borderRadius={"full"}
        onChange={e => setAddress(e.target.value)}
      />
      <Stack direction={"row"}>
        <Input
          variant={"outline"}
          placeholder={"id"}
          borderRadius={"full"}
          type={"number"}
          onChange={e => setId(Number(e.target.value))}
        />
        <Button
          size={"md"}
          minW={24}
          onClick={async () => {
            const uri = await fetchUri(address, id)
            setUri(uri)
            const cogito = await fetchCogito(address, id)
            setCogito(cogito)
          }}
        >
         <Trans>Search</Trans>
        </Button>
      </Stack>
      <Stack borderRadius={"2xl"}>
        <Heading fontSize={"xl"} p={2}>Search Result</Heading>
        <Stack boxShadow={"base"} borderRadius={"md"} p={4}>
          {uri && cogito ? (
            <Link href={parseUriToHttp(uri)[0]} isExternal>
              {uri}
            </Link>
          ) : (
            <Heading size={"md"}>
              <Trans>404</Trans>
            </Heading>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Explore
