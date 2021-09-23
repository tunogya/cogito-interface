import useScrollPosition from "@react-hook/window-scroll"
import styled from "styled-components/macro"
import Logo from "../../assets/svg/logo.svg"
import LogoDark from "../../assets/svg/logo.svg"
import {useColorMode, HStack, Input, Button} from "@chakra-ui/react"
import { t, Trans } from "@lingui/macro"

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  position: relative;
  /* Background slide effect on scroll. */
  background-position: ${({ showBackground }) => (showBackground ? "0 -100%" : "0 0")};
  background-size: 100% 200%;
  background-color: white;
  transition: background-position 0.1s, box-shadow 0.1s;
  background-blend-mode: hard-light;
`

const CogitoIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  :hover {
    cursor: pointer;
  }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`

const HeaderSearch = styled(HStack)`
  justify-self: center;
  width: 50%;
  direction: column;
`

export const Header = () => {
  const scrollY = useScrollPosition()
  const { colorMode } = useColorMode()

  return (
    <HeaderFrame showBackground={scrollY > 45}>
      <Title>
        <CogitoIcon>
          <img width={"24px"} src={colorMode === "light" ? LogoDark : Logo} alt="logo" />
        </CogitoIcon>
      </Title>
      <HeaderSearch spacing={4}>
        <Input variant="filled" placeholder={t`Search Cogito`}/>
      </HeaderSearch>
      <HeaderControls>
        <Button colorScheme={"blue"}><Trans>Login</Trans></Button>
      </HeaderControls>
    </HeaderFrame>
  )
}

export default Header
