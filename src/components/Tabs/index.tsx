import {Tab, TabList, Tabs} from "@chakra-ui/react";
import React from "react";
import {useHistory} from "react-router-dom";


const CogitoTabs = () => {
  const history = useHistory()
  const tabData = [
    {path: '/cogito', label: 'Cogito'},
    {path: '/memory', label: 'Memory'}
  ]

  return (
    <Tabs onChange={(index) => history.push(tabData[index]['path'])}
          defaultIndex={tabData.findIndex((tab) => tab.path === history.location.pathname)}>
      <TabList>
        {tabData.map((tab, index) => (
            <Tab key={index}>{tab.label}</Tab>
          )
        )}
      </TabList>
    </Tabs>
  )
}

export default CogitoTabs