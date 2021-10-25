import {IconButton, Stack, useColorMode} from "@chakra-ui/react";
import Auth from "./Auth";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import MintCogito from "./MintCogito";

export const BottomNavigation = () => {
  const {colorMode, toggleColorMode} = useColorMode()

  return (
    <Stack h={16} direction={"row"} alignItems={"center"} p={2} justifyContent={"flex-end"}>
      <IconButton
        aria-label={"btn"}
        variant={"ghost"}
        icon={colorMode === "dark" ? <MoonIcon/> : <SunIcon/>}
        onClick={toggleColorMode}
      />
      <Stack w={60}>
        <Auth/>
      </Stack>
      <MintCogito/>
    </Stack>
  )
}