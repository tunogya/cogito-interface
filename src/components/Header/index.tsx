import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuButton, MenuDivider,
  MenuItem, MenuItemOption,
  MenuList, MenuOptionGroup,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { HamburgerIcon } from "@chakra-ui/icons"
import {t, Trans} from "@lingui/macro"
import {useActiveLocale} from "../../hooks/useActiveLocale"

export const Header = () => {
  const links = [
    { path: "/", label: <Trans>Cogito</Trans>},
    { path: "/memory", label: <Trans>Memory</Trans>},
  ]
  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)
  const { colorMode, toggleColorMode } = useColorMode()
  const { locale, switchLocale} = useActiveLocale()

  return (
    <Grid templateColumns="repeat(3, 1fr)" p={4} gap={6} alignItems={"center"}>
      <Stack justifySelf={"flex-start"}>
        <Text fontWeight={"bold"} fontSize={"md"}>
          <Trans>Cogito ergo sum</Trans>
        </Text>
      </Stack>
      <Stack justifySelf={"center"} direction={"row"} p={1} borderRadius={"md"}>
        {links.map((link, index) => (
          <Button
            key={index}
            colorScheme={"gray"}
            size={"md"}
            variant={currentPath === link.path ? "solid" : "ghost"}
            onClick={() => {
              history.push(link.path)
              setCurrentPath(link.path)
            }}
          >
            {link.label}
          </Button>
        ))}
      </Stack>
      <Stack justifySelf={"flex-end"} direction={"row"} alignItems={"center"}>
        <Button size={"md"}>Address</Button>
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} />
          <MenuList>
            <MenuItem><Trans>About</Trans></MenuItem>
            <MenuItem><Trans>Document</Trans></MenuItem>
            <MenuItem onClick={toggleColorMode}>{colorMode === "light" ? t`Dark Mode` : t`Light Mode`}</MenuItem>
            <MenuDivider/>
            <MenuOptionGroup defaultValue={locale} title="language" type="radio">
              <MenuItemOption value="en-US" onClick={() => switchLocale("en-US")}>English</MenuItemOption>
              <MenuItemOption value="zh-CN" onClick={() => switchLocale("zh-CN")}>简体中文</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Stack>
    </Grid>
  )
}

export default Header
