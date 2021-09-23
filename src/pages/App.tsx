import React from "react"
import styled from "styled-components/macro"
import { Route, Switch } from "react-router-dom"
import Header from "../components/Header"
import Cogito from "./Cogito";
import Memory from "./Memory";
import CogitoTabs from "../components/Tabs";

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
  flex-direction: row;
  width: 100%;
  padding: 80px 16px 0px 16px;
  align-items: center;
  flex: 1;
  z-index: 1;
`

const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
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
        <ContentWrapper>
          <CogitoTabs/>
          <Switch>
            <Route exact strict path="/cogito" component={Cogito}/>
            <Route exact strict path="/memory" component={Memory}/>
            <Route />
          </Switch>
        </ContentWrapper>
        <Marginer />
      </BodyWrapper>
    </AppWrapper>
  )
}

export default App
