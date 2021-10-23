import React from "react"
import {Divider, Spacer, Stack} from "@chakra-ui/react"
import Navigation from "../components/Navigation"
import {Redirect, Route, Switch} from "react-router-dom";
import Overview from "./Overview";
import TimeLine from "./TimeLine";
import Explore from "./Explore";
import useWindowDimensions from "../hooks/useWindowDimensions";

function App() {
  const {width} = useWindowDimensions()

  return (
    <Stack h={"100vh"} w={"100vw"} alignItems={"center"} direction={"row"} spacing={0} justifyContent={"center"}>
      {width >= 640 && (
        <Navigation/>
      )}
      <Divider orientation="vertical"/>
      <Stack w={"600px"} h={"100%"} spacing={0}>
        <Switch>
          <Route exact strict path="/" component={Overview}/>
          <Route exact strict path="/timeline" component={TimeLine}/>
          <Redirect to="/"/>
        </Switch>
        <Spacer/>
        {width < 640 && (
          <Navigation/>
        )}
      </Stack>
      <Divider orientation="vertical"/>
      {width >= 800 && (
        <Explore/>
      )}
    </Stack>
  )
}

export default App