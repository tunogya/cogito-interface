import {Stack} from "@chakra-ui/react";
import {Redirect, Route, Switch} from "react-router-dom";
import Fresh from "../../pages/Fresh";
import React from "react";
import Overview from "../../pages/Overview";
import Setting from "../../pages/Setting";

export const Content = () => {
  return (
    <Stack w={"100%"} alignItems={"center"} p={"20px 40px 0px 40px"}>
      <Switch>
        <Route exact strict path="/" component={Overview}/>
        <Route exact strict path="/fresh" component={Fresh}/>
        <Route exact strict path="/setting" component={Setting}/>
        <Redirect to="/"/>
      </Switch>
    </Stack>
  )
}

export default Content