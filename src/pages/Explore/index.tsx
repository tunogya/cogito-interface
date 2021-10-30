import {Button, Heading, Input, Link, Stack, Text} from "@chakra-ui/react"
import {useState} from "react";
import {fetchCogito, fetchUri} from "../../hooks/useCogitoTokenURI";
import parseUriToHttp from "../../utils/parseUriToHttp";

const Explore = () => {
  const [address, setAddress] = useState("")
  const [id, setId] = useState(0)
  const [uri, setUri] = useState(undefined)
  const [cogito, setCogito] = useState()

  return (
    <Stack py={2} px={4} h={"100%"}>
      <Input variant={"filled"} placeholder={"address"} borderRadius={"full"}
             onChange={(e) => setAddress(e.target.value)}/>
      <Stack direction={"row"}>
        <Input variant={"outline"} placeholder={"id"} borderRadius={"full"} type={"number"}
               onChange={(e) => setId(Number(e.target.value))}/>
        <Button size={"md"} minW={24} onClick={async () => {
          const uri = await fetchUri(address, id)
          setUri(uri)
          const cogito = await fetchCogito(address, id)
          setCogito(cogito)
        }}>
          Search
        </Button>
      </Stack>
      <Stack p={2} borderRadius={"2xl"}>
        <Heading fontSize={"xl"}>Search Result</Heading>
        <Stack>
          {uri && cogito ? (
            <Link href={parseUriToHttp(uri)[0]} isExternal>{uri}</Link>
          ) : (
            <Text>404</Text>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Explore
