import React from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import {Divider, Grid, Spacer, Stack} from "@chakra-ui/react"
import Fresh from "./Fresh"
import Navigation from "../components/Navigation";
import SubContent from "../components/SubContent";
import Content from "../components/Content";

function App() {
  return (
    <Grid templateColumns="1fr 2fr 1fr" alignItems={"center"}>
      <Stack h={"100vh"}>
        <Navigation/>
      </Stack>
      <Stack direction={"row"} h={"100%"}>
        <Divider orientation="vertical"/>
        <Content/>
        <Divider orientation="vertical"/>
      </Stack>
      <Stack>
        <SubContent/>
      </Stack>
    </Grid>
  )
}

export default App
