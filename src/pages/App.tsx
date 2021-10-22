import React from "react"
import {Divider, Stack} from "@chakra-ui/react"
import Navigation from "../components/Navigation"
import {Redirect, Route, Switch} from "react-router-dom";
import Overview from "./Overview";
import Setting from "./Setting";
import TimeLine from "./TimeLine";
import Explore from "./Explore";

function App() {
  return (
    <Stack h={"100vh"} w={"100vw"} alignItems={"center"}>
      <Stack direction={"row"} h={"100%"} spacing={0}>
        <Stack minW={"250px"} h={"100%"}>
          <Navigation/>
        </Stack>
        <Divider orientation="vertical"/>
        <Stack minW={"600px"} h={"100%"}>
          <Switch>
            <Route exact strict path="/" component={Overview}/>
            <Route exact strict path="/timeline" component={TimeLine}/>
            <Route exact strict path="/setting" component={Setting}/>
            <Redirect to="/"/>
          </Switch>
        </Stack>
        <Divider orientation="vertical"/>
        <Stack minW={"350px"} h={"100%"}>
          <Explore/>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default App