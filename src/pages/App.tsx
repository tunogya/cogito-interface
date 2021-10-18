import React from "react"
import { Divider, Grid, Stack } from "@chakra-ui/react"
import Navigation from "../components/Navigation"
import {Redirect, Route, Switch} from "react-router-dom";
import Overview from "./Overview";
import Setting from "./Setting";
import TimeLine from "./TimeLine";
import Explore from "./Explore";

function App() {
  return (
    <Grid templateColumns="1fr 2fr 1.2fr" alignItems={"center"} h={"100vh"}>
      <Stack h={"100%"} w={"100%"}>
        <Navigation />
      </Stack>
      <Stack h={"100%"} w={"100%"} direction={"row"} spacing={0}>
        <Divider orientation="vertical"/>
        <Stack w={"100%"} alignItems={"center"} minW={"480px"}>
          <Switch>
            <Route exact strict path="/" component={Overview} />
            <Route exact strict path="/timeline" component={TimeLine}/>
            <Route exact strict path="/setting" component={Setting} />
            <Redirect to="/" />
          </Switch>
        </Stack>
        <Divider orientation="vertical" />
      </Stack>
      <Stack h={"100%"} w={"100%"} spacing={0}>
        <Explore/>
      </Stack>
    </Grid>
  )
}

export default App
