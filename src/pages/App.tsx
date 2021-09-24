import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import { Stack } from '@chakra-ui/react'
import Header from '../components/Header'
import Cogito from "./Cogito";
import Memory from './Memory'

function App() {
  return (
    <Stack spacing={0} minH={"100vh"}>
      <Stack position={'fixed'} w={'100%'}>
        <Header />
      </Stack>
      <Stack p={'120px 16px 0 16px'} alignItems={'center'}>
        <Switch>
          <Route exact strict path="/memory" component={Memory}/>
          <Route exact strict path="/" component={Cogito}/>
          <Redirect to="/" />
        </Switch>
      </Stack>
    </Stack>
  )
}

export default App
