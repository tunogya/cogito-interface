import { FC, Suspense } from "react"
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading, Spinner, Text} from "@chakra-ui/react"

interface Props {
  id: number
}

const CogitoItem: FC<Props> = props => {
  return (
    <AccordionItem>
      <AccordionButton h={12}>
        <Heading flex="1" textAlign="left" fontWeight={"normal"} fontSize={"md"}>
          #{props.id}
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Suspense fallback={<Spinner size={"sm"}/>}>
          <CogitoContent id={props.id}/>
        </Suspense>
      </AccordionPanel>
    </AccordionItem>
  )
}

const CogitoContent: FC<Props> = props => {
  return (
    <Text>{props.id}</Text>
  )
}

export default CogitoItem
