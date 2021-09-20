import React from "react"
import styled from "styled-components/macro"
import { Route, Switch } from "react-router-dom"
import Header from "../components/Header"

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const HeaderWrapper = styled.div`
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 120px 16px 0px 16px;
  align-items: center;
  flex: 1;
  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

function App() {
  return (
    <AppWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <BodyWrapper>
        <Switch>
          <Route exact strict path="/vote" />
          <Route />
        </Switch>
        <Marginer />
      </BodyWrapper>
    </AppWrapper>
  )
}

export default App
