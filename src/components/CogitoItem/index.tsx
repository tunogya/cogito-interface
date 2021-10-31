import { FC, Suspense, lazy } from "react"
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading, Spinner } from "@chakra-ui/react"

interface CogitoItemProps {
  address: string | null
  id: number
}

const CogitoItem: FC<CogitoItemProps> = props => {
  const CogitoContent = lazy(() => import("./CogitoContent"))

  return (
    <AccordionItem>
      <AccordionButton h={12}>
        <Heading flex="1" textAlign="left" fontWeight={"normal"} fontSize={"md"}>
          #{props.id}
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Suspense fallback={<Spinner size={"sm"} />}>
          <CogitoContent address={props.address} id={props.id} />
        </Suspense>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default CogitoItem
