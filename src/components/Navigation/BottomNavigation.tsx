import {Heading, Stack} from "@chakra-ui/react";
import Auth from "./Auth";

export const BottomNavigation = () => {
  return (
    <Stack h={16} direction={"row"} alignItems={"center"} p={2} justifyContent={"space-between"}>
      <Heading fontSize={"md"}>Cogito ergo sum</Heading>
      <Stack w={60}>
        <Auth/>
      </Stack>
    </Stack>
  )
}