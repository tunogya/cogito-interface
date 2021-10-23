import { FC } from "react"
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading } from "@chakra-ui/react"

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
      <AccordionPanel/>
    </AccordionItem>
  )
}

export default CogitoItem
