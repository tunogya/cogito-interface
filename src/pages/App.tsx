import React from "react"
import { Divider, Grid, Stack } from "@chakra-ui/react"
import Navigation from "../components/Navigation"
import SubContent from "../components/SubContent"
import Content from "../components/Content"

function App() {
  return (
    <Grid templateColumns="1fr 2fr 1fr" alignItems={"center"} minH={"100vh"}>
      <Stack h={"100%"} w={"100%"}>
        <Navigation />
      </Stack>
      <Stack h={"100%"} w={"100%"} direction={"row"} spacing={0}>
        <Divider orientation="vertical"/>
        <Content />
        <Divider orientation="vertical" />
      </Stack>
      <Stack h={"100%"} w={"100%"}>
        <SubContent />
      </Stack>
    </Grid>
  )
}

export default App
