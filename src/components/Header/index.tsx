import useScrollPosition from '@react-hook/window-scroll'
import styled from "styled-components/macro";
import Logo from '../../assets/svg/logo.svg'
import LogoDark from '../../assets/svg/logo.svg'
import {useColorMode} from "@chakra-ui/react";

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
  background-position: ${({showBackground}) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
  transition: background-position 0.1s, box-shadow 0.1s;
  background-blend-mode: hard-light;
`

const CogitoIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

export const Header = () => {
  const scrollY = useScrollPosition()
  const {colorMode} = useColorMode()

  return (
    <HeaderFrame showBackground={scrollY > 45}>
      <CogitoIcon>
        <img width={'24px'} src={colorMode === "light" ? LogoDark : Logo} alt="logo"/>
      </CogitoIcon>
    </HeaderFrame>
  )
}

export default Header