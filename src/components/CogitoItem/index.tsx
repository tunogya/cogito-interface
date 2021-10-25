import {FC, Suspense} from "react"
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  Spinner,
  Stack,
  Text
} from "@chakra-ui/react"
import useCogitoTokenURI from "../../hooks/useCogitoTokenURI";
import {parseDate} from "../../utils/parseDate";

interface Props {
  address: string | null
  id: number
}

const CogitoItem: FC<Props> = props => {
  return (
    <AccordionItem>
      <AccordionButton h={12}>
        <Heading flex="1" textAlign="left" fontWeight={"normal"} fontSize={"md"}>
          #{props.id}
        </Heading>
        <AccordionIcon/>
      </AccordionButton>
      <AccordionPanel>
        <Suspense fallback={<Spinner size={"sm"}/>}>
          <CogitoContent address={props.address} id={props.id}/>
        </Suspense>
      </AccordionPanel>
    </AccordionItem>
  )
}

const CogitoContent: FC<Props> = props => {
  const uri = useCogitoTokenURI(props.address, props.id)

  return (
    <Stack>
      <Text>{uri.cogito.text}</Text>
      <Text fontSize={"xs"} color={"gray"}>{parseDate(uri.cogito.create_at)}</Text>
    </Stack>

  )
}

export default CogitoItem
