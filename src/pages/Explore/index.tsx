import { Button, Heading, Input, Stack, Text } from "@chakra-ui/react"

const Explore = () => {
  return (
    <Stack py={2} px={4} h={"100%"} w={80}>
      <Input variant={"filled"} placeholder={"address"} borderRadius={"full"} />
      <Stack direction={"row"}>
        <Input variant={"outline"} placeholder={"id"} borderRadius={"full"} />
        <Button size={"md"} minW={24}>
          Search
        </Button>
      </Stack>
      <Stack p={2} borderRadius={"2xl"}>
        <Heading fontSize={"xl"}>IDs</Heading>
        <Stack>
          <Text>Res</Text>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Explore
