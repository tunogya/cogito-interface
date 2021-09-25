import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Trans } from "@lingui/macro"
import { useActiveLocale } from "../../hooks/useActiveLocale"
import { LOCALE_LABEL, SUPPORTED_LOCALES } from "../../constants/locales"

export const Header = () => {
  const links = [
    { path: "/", label: <Trans>Cogito</Trans> },
    { path: "/memory", label: <Trans>Memory</Trans> },
  ]
  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)
  const { colorMode, toggleColorMode } = useColorMode()
  const { locale, switchLocale } = useActiveLocale()

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
            <MenuItem>
              <Trans>About</Trans>
            </MenuItem>
            <MenuItem>
              <Trans>Document</Trans>
            </MenuItem>
            <MenuItem onClick={toggleColorMode}>
              {colorMode === "light" ? <Trans>Dark Mode</Trans> : <Trans>Light Mode</Trans>}
            </MenuItem>
            <MenuDivider />
            <MenuOptionGroup defaultValue={locale} title="language" type="radio">
              {SUPPORTED_LOCALES.map((locale, index) => (
                <MenuItemOption value={locale} key={index} onClick={() => switchLocale(locale)}>
                  {LOCALE_LABEL[locale]}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Stack>
    </Grid>
  )
}

export default Header
