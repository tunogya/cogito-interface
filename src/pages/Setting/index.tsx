import {
  Accordion,
} from "@chakra-ui/react"
import Content from "../../components/Content";
import Appearance from "./Appearance";
import Language from "./Language";
import ApiKeys from "./ApiKeys";

const Setting = () => {
  return (
    <Content label={"Setting"}>
      <Accordion defaultIndex={[]} allowMultiple w={"100%"}>
        <Appearance />
        <Language />
        <ApiKeys />
      </Accordion>
    </Content>
  )
}

export default Setting
