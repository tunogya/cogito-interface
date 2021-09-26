import {Stack} from "@chakra-ui/react";
import {Redirect, Route, Switch} from "react-router-dom";
import Fresh from "../../pages/Fresh";
import React from "react";

export const Content = () => {
  return (
    <Stack w={"100%"} alignItems={"center"}>
      <Switch>
        <Route exact strict path="/" component={Fresh}/>
        <Redirect to="/"/>
      </Switch>
    </Stack>
  )
}

export default Content