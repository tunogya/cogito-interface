import {Button, Heading, Input, Stack, Text} from "@chakra-ui/react";

const Explore = () => {
  return (
    <Stack spacing={4} p={4}>
      <Input variant={"filled"} placeholder={"address"} borderRadius={"32px"}/>
      <Stack direction={"row"}>
        <Input variant={"outline"} placeholder={"id"} borderRadius={"32px"}/>
        <Button size={"md"} minW={"100px"}>
          Search
        </Button>
      </Stack>
      <Stack p={4} borderRadius={"16px"}>
        <Heading fontSize={"xl"}>Ids</Heading>
        <Stack>
          <Text>Res</Text>
        </Stack>
      </Stack>


    </Stack>
  )
}

export default Explore