import React from "react"
import { Divider, Grid, Stack } from "@chakra-ui/react"
import Navigation from "../components/Navigation"
import {Redirect, Route, Switch} from "react-router-dom";
import Overview from "./Overview";
import Fresh from "./Fresh";
import Setting from "./Setting";
import Loss from "./Loss";

function App() {
  return (
    <Grid templateColumns="1fr 2fr 1fr" alignItems={"center"} minH={"100vh"}>
      <Stack h={"100%"} w={"100%"}>
        <Navigation />
      </Stack>
      <Stack h={"100%"} w={"100%"} direction={"row"} spacing={0}>
        <Divider orientation="vertical"/>
        <Stack w={"100%"} alignItems={"center"} minW={"480px"}>
          <Switch>
            <Route exact strict path="/" component={Overview} />
            <Route exact strict path="/fresh" component={Fresh} />
            <Route exact strict path="/setting" component={Setting} />
            <Redirect to="/" />
          </Switch>
        </Stack>
        <Divider orientation="vertical" />
      </Stack>
      <Stack h={"100%"} w={"100%"} spacing={0}>
        <Loss />
      </Stack>
    </Grid>
  )
}

export default App
