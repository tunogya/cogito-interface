import React from "react"
import { Box, Divider, Stack, useColorMode } from "@chakra-ui/react"
import Navigation from "../components/Navigation"
import { Redirect, Route, Switch } from "react-router-dom"
import Overview from "./Overview"
import TimeLine from "./TimeLine"
import Explore from "./Explore"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { BottomNavigation } from "../components/Navigation/BottomNavigation"
import { TopNavigation } from "../components/Navigation/TopNavigation"

function App() {
  const { width, height } = useWindowDimensions()
  const { colorMode } = useColorMode()

  return (
    <Stack w={width} alignItems={"center"} direction={"row"} spacing={0} justifyContent={"center"} h={height}>
      {width >= 640 && <Navigation />}
      <Divider orientation="vertical" />
      <Stack w={"600px"} h={"100%"} spacing={0}>
        {width < 640 && (
          <>
            <TopNavigation />
            <Divider />
          </>
        )}
        <Switch>
          <Route exact strict path="/" component={Overview} />
          <Route exact strict path="/timeline" component={TimeLine} />
          {width < 980 && <Route exact strict path="/explore" component={Explore} />}
          <Redirect to="/" />
        </Switch>
        {width < 640 && (
          <Box position={"fixed"} bottom={0} w={"100%"} background={colorMode === "light" ? "white" : "black"}>
            <Divider />
            <BottomNavigation />
          </Box>
        )}
      </Stack>
      <Divider orientation="vertical" />
      {width >= 980 && <Explore w={"350px"} />}
    </Stack>
  )
}

export default App
