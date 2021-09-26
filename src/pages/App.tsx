import React from "react"
import {Divider, Grid, Stack} from "@chakra-ui/react"
import Navigation from "../components/Navigation";
import SubContent from "../components/SubContent";
import Content from "../components/Content";

function App() {
  return (
    <Grid templateColumns="1fr 2fr 1fr" alignItems={"center"} minH={"100vh"}>
      <Stack h={"100%"} justifySelf={"flex-end"} p={"20px 40px 20px 40px"}>
        <Navigation/>
      </Stack>
      <Stack h={"100%"} direction={"row"}>
        <Divider orientation="vertical"/>
        <Content/>
        <Divider orientation="vertical"/>
      </Stack>
      <Stack h={"100%"} justifySelf={"flex-start"} p={"20px 40px 0px 40px"}>
        <SubContent/>
      </Stack>
    </Grid>
  )
}

export default App
