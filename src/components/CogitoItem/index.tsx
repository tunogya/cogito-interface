import {FC} from "react"
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading} from "@chakra-ui/react"

interface Props {
  id: number
}

const CogitoItem: FC<Props> = (props) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Heading flex="1" textAlign="left" fontWeight={"normal"} fontSize={"md"}>
          #{props.id}
        </Heading>
        <AccordionIcon/>
      </AccordionButton>
      <AccordionPanel>

      </AccordionPanel>
    </AccordionItem>
  )
}

export default CogitoItem